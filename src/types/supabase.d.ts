export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      channels: {
        Row: {
          created_at: string;
          description: string | null;
          id: number;
          name: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: number;
          name: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      chat_rooms: {
        Row: {
          created_at: string;
          id: string;
          user1_id: string;
          user2_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          user1_id: string;
          user2_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          user1_id?: string;
          user2_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "chat_rooms_user1_id_fkey";
            columns: ["user1_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "chat_rooms_user2_id_fkey";
            columns: ["user2_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      comments: {
        Row: {
          author_id: string;
          comment: string;
          created_at: string;
          deleted: boolean;
          edited: boolean;
          id: number;
          parent_id: number | null;
          post_id: number | null;
        };
        Insert: {
          author_id: string;
          comment: string;
          created_at?: string;
          deleted?: boolean;
          edited?: boolean;
          id?: number;
          parent_id?: number | null;
          post_id?: number | null;
        };
        Update: {
          author_id?: string;
          comment?: string;
          created_at?: string;
          deleted?: boolean;
          edited?: boolean;
          id?: number;
          parent_id?: number | null;
          post_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "comments_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "comments_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "comments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "comments_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          }
        ];
      };
      couples: {
        Row: {
          created_at: string;
          id: number;
          meet_date: string | null;
          partner_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          meet_date?: string | null;
          partner_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          meet_date?: string | null;
          partner_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "couples_partner_id_fkey";
            columns: ["partner_id"];
            isOneToOne: true;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "couples_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      follows: {
        Row: {
          created_at: string;
          follow_id: string;
          id: number;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          follow_id: string;
          id?: number;
          user_id: string;
        };
        Update: {
          created_at?: string;
          follow_id?: string;
          id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "follows_follow_id_fkey";
            columns: ["follow_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "follows_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      likes: {
        Row: {
          created_at: string;
          id: number;
          post_id: number;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          post_id: number;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          post_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "likes_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "likes_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      matchings: {
        Row: {
          created_at: string;
          id: number;
          is_matched: boolean;
          is_rejected: boolean;
          matching_user_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          is_matched?: boolean;
          is_rejected?: boolean;
          matching_user_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          is_matched?: boolean;
          is_rejected?: boolean;
          matching_user_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "matchings_matching_user_id_fkey";
            columns: ["matching_user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "matchings_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      messages: {
        Row: {
          chat_room_id: string;
          created_at: string;
          id: number;
          message: string;
          receiver_id: string;
          seen: boolean;
          sender_id: string;
        };
        Insert: {
          chat_room_id: string;
          created_at?: string;
          id?: number;
          message: string;
          receiver_id: string;
          seen?: boolean;
          sender_id: string;
        };
        Update: {
          chat_room_id?: string;
          created_at?: string;
          id?: number;
          message?: string;
          receiver_id?: string;
          seen?: boolean;
          sender_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "messages_chat_room_id_fkey";
            columns: ["chat_room_id"];
            isOneToOne: false;
            referencedRelation: "chat_rooms";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "messages_receiver_id_fkey";
            columns: ["receiver_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "messages_sender_id_fkey";
            columns: ["sender_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      notifications: {
        Row: {
          created_at: string;
          id: number;
          post_id: number | null;
          receiver_id: string;
          sender_id: string;
          type: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          post_id?: number | null;
          receiver_id: string;
          sender_id: string;
          type?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          post_id?: number | null;
          receiver_id?: string;
          sender_id?: string;
          type?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "notifications_author_id_fkey";
            columns: ["sender_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "notifications_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "notifications_receiver_id_fkey";
            columns: ["receiver_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "notifications_sender_id_fkey";
            columns: ["sender_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "notifications_user_id_fkey";
            columns: ["receiver_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      posts: {
        Row: {
          author_id: string;
          channel_name: string;
          contents: string;
          created_at: string;
          fortune_telling: string | null;
          id: number;
          images: string[] | null;
          title: string;
        };
        Insert: {
          author_id: string;
          channel_name: string;
          contents?: string;
          created_at?: string;
          fortune_telling?: string | null;
          id?: number;
          images?: string[] | null;
          title: string;
        };
        Update: {
          author_id?: string;
          channel_name?: string;
          contents?: string;
          created_at?: string;
          fortune_telling?: string | null;
          id?: number;
          images?: string[] | null;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "posts_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "posts_channel_name_fkey";
            columns: ["channel_name"];
            isOneToOne: false;
            referencedRelation: "channels";
            referencedColumns: ["name"];
          }
        ];
      };
      profiles: {
        Row: {
          age: number | null;
          couple_id: number | null;
          created_at: string;
          description: string | null;
          email: string | null;
          gender: string | null;
          height: number | null;
          id: string;
          ideal_types: string[] | null;
          interests: string[] | null;
          job: string | null;
          keywords: string[] | null;
          location: string | null;
          main_image: string | null;
          mbti: string | null;
          nickname: string | null;
          partner_nickname: string | null;
          status: string | null;
          sub_image: string | null;
        };
        Insert: {
          age?: number | null;
          couple_id?: number | null;
          created_at?: string;
          description?: string | null;
          email?: string | null;
          gender?: string | null;
          height?: number | null;
          id?: string;
          ideal_types?: string[] | null;
          interests?: string[] | null;
          job?: string | null;
          keywords?: string[] | null;
          location?: string | null;
          main_image?: string | null;
          mbti?: string | null;
          nickname?: string | null;
          partner_nickname?: string | null;
          status?: string | null;
          sub_image?: string | null;
        };
        Update: {
          age?: number | null;
          couple_id?: number | null;
          created_at?: string;
          description?: string | null;
          email?: string | null;
          gender?: string | null;
          height?: number | null;
          id?: string;
          ideal_types?: string[] | null;
          interests?: string[] | null;
          job?: string | null;
          keywords?: string[] | null;
          location?: string | null;
          main_image?: string | null;
          mbti?: string | null;
          nickname?: string | null;
          partner_nickname?: string | null;
          status?: string | null;
          sub_image?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_couple_id_fkey";
            columns: ["couple_id"];
            isOneToOne: false;
            referencedRelation: "couples";
            referencedColumns: ["id"];
          }
        ];
      };
      schedules: {
        Row: {
          couple_id: number;
          created_at: string;
          date: string;
          id: number;
          memo: string | null;
          title: string;
        };
        Insert: {
          couple_id: number;
          created_at?: string;
          date: string;
          id?: number;
          memo?: string | null;
          title: string;
        };
        Update: {
          couple_id?: number;
          created_at?: string;
          date?: string;
          id?: number;
          memo?: string | null;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "calendars_couple_id_fkey";
            columns: ["couple_id"];
            isOneToOne: false;
            referencedRelation: "couples";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
      DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
      DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const;
