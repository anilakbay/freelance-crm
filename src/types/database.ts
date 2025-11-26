export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      // --- MÜŞTERİLER TABLOSU ---
      clients: {
        Row: {
          id: number;
          created_at: string;
          name: string;
          email: string | null;
          phone: string | null;
          status: "active" | "passive" | "pending";
          user_id: string; // YENİ EKLENDİ (UUID)
        };
        Insert: {
          id?: number;
          created_at?: string;
          name: string;
          email?: string | null;
          phone?: string | null;
          status?: "active" | "passive" | "pending";
          user_id?: string; // Opsiyonel çünkü default: auth.uid()
        };
        Update: {
          id?: number;
          created_at?: string;
          name?: string;
          email?: string | null;
          phone?: string | null;
          status?: "active" | "passive" | "pending";
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "clients_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };

      // --- PROJELER TABLOSU ---
      projects: {
        Row: {
          id: number;
          created_at: string;
          title: string;
          client_id: number;
          price: number | null;
          deadline: string | null;
          status: "active" | "completed" | "cancelled" | "pending";
          user_id: string; // YENİ EKLENDİ (UUID)
        };
        Insert: {
          id?: number;
          created_at?: string;
          title: string;
          client_id: number;
          price?: number | null;
          deadline?: string | null;
          status?: "active" | "completed" | "cancelled" | "pending";
          user_id?: string; // Opsiyonel çünkü default: auth.uid()
        };
        Update: {
          id?: number;
          created_at?: string;
          title?: string;
          client_id?: number;
          price?: number | null;
          deadline?: string | null;
          status?: "active" | "completed" | "cancelled" | "pending";
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "projects_client_id_fkey";
            columns: ["client_id"];
            referencedRelation: "clients";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "projects_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };

      // --- GÖREVLER TABLOSU (YENİ) ---
      tasks: {
        Row: {
          id: number;
          created_at: string;
          title: string;
          status: string;
          priority: string;
          due_date: string | null;
          project_id: number;
          user_id: string;
        };
        Insert: {
          id?: number;
          created_at?: string;
          title: string;
          status?: string; // Default: 'pending'
          priority?: string; // Default: 'medium'
          due_date?: string | null;
          project_id: number;
          user_id?: string; // Default: auth.uid()
        };
        Update: {
          id?: number;
          created_at?: string;
          title?: string;
          status?: string;
          priority?: string;
          due_date?: string | null;
          project_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "tasks_project_id_fkey";
            columns: ["project_id"];
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tasks_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
