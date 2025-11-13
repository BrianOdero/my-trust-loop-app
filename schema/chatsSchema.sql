-- ========== DROP EXISTING OBJECTS ==========
-- Drop triggers first (they depend on functions)
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
DROP TRIGGER IF EXISTS update_chat_rooms_updated_at ON public.chat_rooms;
DROP TRIGGER IF EXISTS update_messages_updated_at ON public.messages;

-- Drop functions
DROP FUNCTION IF EXISTS get_or_create_individual_chat CASCADE;
DROP FUNCTION IF EXISTS sync_phone_contacts CASCADE;
DROP FUNCTION IF EXISTS mark_messages_as_read CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column CASCADE;
DROP FUNCTION IF EXISTS handle_new_user CASCADE;

-- Drop tables in correct order (children first)
DROP TABLE IF EXISTS public.ai_sessions CASCADE;
DROP TABLE IF EXISTS public.messages CASCADE;
DROP TABLE IF EXISTS public.chat_room_members CASCADE;
DROP TABLE IF EXISTS public.phone_contacts CASCADE;
DROP TABLE IF EXISTS public.chat_rooms CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- ========== CREATE TABLES ==========
-- 1. Profiles: store user information
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  display_name text NOT NULL,
  avatar_url text,
  phone_number text UNIQUE,
  is_online boolean DEFAULT false,
  last_seen timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. Phone Contacts: store user's phone contacts
CREATE TABLE public.phone_contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  contact_name text NOT NULL,
  phone_number text NOT NULL,
  contact_user_id uuid REFERENCES auth.users (id) ON DELETE SET NULL,
  is_registered boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, phone_number)
);

-- 3. Chat Rooms: for both individual and group chats
CREATE TABLE public.chat_rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  type text NOT NULL CHECK (type IN ('individual', 'group', 'ai')),
  created_by uuid REFERENCES auth.users (id) ON DELETE CASCADE,
  avatar_url text,
  last_message text,
  last_message_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 4. Chat Room Members: track who's in which chat
CREATE TABLE public.chat_room_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_room_id uuid NOT NULL REFERENCES chat_rooms (id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  role text DEFAULT 'member' CHECK (role IN ('admin', 'member')),
  joined_at timestamptz DEFAULT now(),
  UNIQUE(chat_room_id, user_id)
);

-- 5. Messages: store all chat messages
CREATE TABLE public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_room_id uuid NOT NULL REFERENCES chat_rooms (id) ON DELETE CASCADE,
  sender_id uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  content text NOT NULL,
  message_type text DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'file', 'system')),
  read_by jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 6. AI Assistant Sessions: track AI chat sessions
CREATE TABLE public.ai_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  chat_room_id uuid NOT NULL REFERENCES chat_rooms (id) ON DELETE CASCADE,
  context jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, chat_room_id)
);

-- ========== CREATE FUNCTIONS ==========
-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to create individual chat between two users
CREATE OR REPLACE FUNCTION get_or_create_individual_chat(user1_id uuid, user2_id uuid)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  existing_chat_id uuid;
  new_chat_id uuid;
  user2_phone text;
BEGIN
  -- Check if chat already exists between these two users (in any order)
  SELECT cr.id INTO existing_chat_id
  FROM chat_rooms cr
  INNER JOIN chat_room_members crm1 ON cr.id = crm1.chat_room_id
  INNER JOIN chat_room_members crm2 ON cr.id = crm2.chat_room_id
  WHERE cr.type = 'individual'
    AND ((crm1.user_id = user1_id AND crm2.user_id = user2_id)
      OR (crm1.user_id = user2_id AND crm2.user_id = user1_id))
  LIMIT 1;
  
  IF existing_chat_id IS NOT NULL THEN
    RETURN existing_chat_id;
  END IF;
  
  -- Get the other user's phone number for reference
  SELECT phone_number INTO user2_phone FROM profiles WHERE id = user2_id;
  
  -- Create new individual chat with the other user's phone number as name
  INSERT INTO chat_rooms (name, type, created_by)
  VALUES (user2_phone, 'individual', user1_id)
  RETURNING id INTO new_chat_id;
  
  -- Add both users to chat
  INSERT INTO chat_room_members (chat_room_id, user_id) VALUES
  (new_chat_id, user1_id),
  (new_chat_id, user2_id);
  
  RETURN new_chat_id;
END;
$$;

-- Function to sync phone contacts
CREATE OR REPLACE FUNCTION sync_phone_contacts(
  p_user_id uuid,
  p_contacts jsonb
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  contact_record jsonb;
  registered_user_id uuid;
BEGIN
  DELETE FROM phone_contacts WHERE user_id = p_user_id;
  
  FOR contact_record IN SELECT * FROM jsonb_array_elements(p_contacts)
  LOOP
    SELECT id INTO registered_user_id
    FROM profiles 
    WHERE phone_number = contact_record->>'phone_number';
    
    INSERT INTO phone_contacts (
      user_id, 
      contact_name, 
      phone_number, 
      contact_user_id,
      is_registered
    ) VALUES (
      p_user_id,
      contact_record->>'contact_name',
      contact_record->>'phone_number',
      registered_user_id,
      registered_user_id IS NOT NULL
    );
  END LOOP;
END;
$$;

-- Function to mark messages as read
CREATE OR REPLACE FUNCTION mark_messages_as_read(p_chat_room_id uuid, p_user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE messages
  SET read_by = read_by || jsonb_build_array(p_user_id)
  WHERE chat_room_id = p_chat_room_id
    AND sender_id != p_user_id
    AND NOT (read_by @> jsonb_build_array(p_user_id));
END;
$$;

-- ========== CREATE TRIGGERS ==========
CREATE TRIGGER update_profiles_updated_at 
  BEFORE UPDATE ON public.profiles 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_chat_rooms_updated_at 
  BEFORE UPDATE ON public.chat_rooms 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_messages_updated_at 
  BEFORE UPDATE ON public.messages 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- ========== ENABLE ROW LEVEL SECURITY ==========
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.phone_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_room_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_sessions ENABLE ROW LEVEL SECURITY;

-- ========== CREATE POLICIES ==========
-- Profiles policies
DROP POLICY IF EXISTS "profiles_select_all" ON public.profiles;
CREATE POLICY "profiles_select_all" ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Phone Contacts policies
DROP POLICY IF EXISTS "contacts_select_own" ON public.phone_contacts;
CREATE POLICY "contacts_select_own" ON public.phone_contacts FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "contacts_manage_own" ON public.phone_contacts;
CREATE POLICY "contacts_manage_own" ON public.phone_contacts FOR ALL USING (auth.uid() = user_id);

-- Chat Rooms policies
DROP POLICY IF EXISTS "chat_rooms_select_member" ON public.chat_rooms;
CREATE POLICY "chat_rooms_select_member" ON public.chat_rooms FOR SELECT USING (
  EXISTS (SELECT 1 FROM chat_room_members WHERE chat_room_members.chat_room_id = chat_rooms.id AND chat_room_members.user_id = auth.uid())
);

DROP POLICY IF EXISTS "chat_rooms_insert_own" ON public.chat_rooms;
CREATE POLICY "chat_rooms_insert_own" ON public.chat_rooms FOR INSERT WITH CHECK (auth.uid() = created_by);

DROP POLICY IF EXISTS "chat_rooms_update_own" ON public.chat_rooms;
CREATE POLICY "chat_rooms_update_own" ON public.chat_rooms FOR UPDATE USING (auth.uid() = created_by);

-- Chat Room Members policies
DROP POLICY IF EXISTS "chat_members_select_own" ON public.chat_room_members;
CREATE POLICY "chat_members_select_own" ON public.chat_room_members FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "chat_members_insert_own" ON public.chat_room_members;
CREATE POLICY "chat_members_insert_own" ON public.chat_room_members FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "chat_members_insert_admin" ON public.chat_room_members;
CREATE POLICY "chat_members_insert_admin" ON public.chat_room_members FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM chat_rooms WHERE chat_rooms.id = chat_room_members.chat_room_id AND chat_rooms.created_by = auth.uid())
);

-- Messages policies
DROP POLICY IF EXISTS "messages_select_member" ON public.messages;
CREATE POLICY "messages_select_member" ON public.messages FOR SELECT USING (
  EXISTS (SELECT 1 FROM chat_room_members WHERE chat_room_members.chat_room_id = messages.chat_room_id AND chat_room_members.user_id = auth.uid())
);

DROP POLICY IF EXISTS "messages_insert_member" ON public.messages;
CREATE POLICY "messages_insert_member" ON public.messages FOR INSERT WITH CHECK (
  auth.uid() = sender_id AND
  EXISTS (SELECT 1 FROM chat_room_members WHERE chat_room_members.chat_room_id = messages.chat_room_id AND chat_room_members.user_id = auth.uid())
);

DROP POLICY IF EXISTS "messages_update_own" ON public.messages;
CREATE POLICY "messages_update_own" ON public.messages FOR UPDATE USING (auth.uid() = sender_id) WITH CHECK (auth.uid() = sender_id);

-- AI Sessions policies
DROP POLICY IF EXISTS "ai_sessions_select_own" ON public.ai_sessions;
CREATE POLICY "ai_sessions_select_own" ON public.ai_sessions FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "ai_sessions_manage_own" ON public.ai_sessions;
CREATE POLICY "ai_sessions_manage_own" ON public.ai_sessions FOR ALL USING (auth.uid() = user_id);

-- ========== CREATE INDEXES ==========
CREATE INDEX IF NOT EXISTS idx_profiles_phone_number ON profiles(phone_number);
CREATE INDEX IF NOT EXISTS idx_phone_contacts_user_id ON phone_contacts(user_id);
CREATE INDEX IF NOT EXISTS idx_phone_contacts_phone_number ON phone_contacts(phone_number);
CREATE INDEX IF NOT EXISTS idx_chat_rooms_type ON chat_rooms(type);
CREATE INDEX IF NOT EXISTS idx_chat_rooms_last_message_at ON chat_rooms(last_message_at);
CREATE INDEX IF NOT EXISTS idx_chat_room_members_user_id ON chat_room_members(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_room_members_chat_room_id ON chat_room_members(chat_room_id);
CREATE INDEX IF NOT EXISTS idx_messages_chat_room_id ON messages(chat_room_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);

-- ========== ENABLE REAL-TIME ==========
-- Remove tables from publication first to avoid duplicates
ALTER PUBLICATION supabase_realtime DROP TABLE IF EXISTS chat_rooms, messages, chat_room_members;
-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE chat_rooms;
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
ALTER PUBLICATION supabase_realtime ADD TABLE chat_room_members;