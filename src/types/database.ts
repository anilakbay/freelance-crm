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
      clients: {
        Row: {
          created_at: string;
          email: string | null;
          id: number;
          name: string;
          phone: string | null;
          status: "active" | "passive" | "pending";
        };
        Insert: {
          created_at?: string;
          email?: string | null;
          id?: number;
          name: string;
          phone?: string | null;
          status?: "active" | "passive" | "pending";
        };
        Update: {
          created_at?: string;
          email?: string | null;
          id?: number;
          name?: string;
          phone?: string | null;
          status?: "active" | "passive" | "pending";
        };
        Relationships: [];
      };
      projects: {
        Row: {
          client_id: number;
          created_at: string;
          deadline: string | null;
          id: number;
          price: number | null;
          status: "active" | "completed" | "cancelled" | "pending";
          title: string;
        };
        Insert: {
          client_id: number;
          created_at?: string;
          deadline?: string | null;
          id?: number;
          price?: number | null;
          status?: "active" | "completed" | "cancelled" | "pending";
          title: string;
        };
        Update: {
          client_id?: number;
          created_at?: string;
          deadline?: string | null;
          id?: number;
          price?: number | null;
          status?: "active" | "completed" | "cancelled" | "pending";
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "projects_client_id_fkey";
            columns: ["client_id"];
            referencedRelation: "clients";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

