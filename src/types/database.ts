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
          company: string | null;
          status: "active" | "passive" | "pending";
          user_id: string;
        };
        Insert: {
          created_at?: string;
          email?: string | null;
          id?: number;
          name: string;
          phone?: string | null;
          company?: string | null;
          status?: "active" | "passive" | "pending";
          user_id?: string;
        };
        Update: {
          created_at?: string;
          email?: string | null;
          id?: number;
          name?: string;
          phone?: string | null;
          company?: string | null;
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

      projects: {
        Row: {
          client_id: number;
          created_at: string;
          deadline: string | null;
          id: number;
          price: number | null;
          status: "active" | "completed" | "cancelled" | "pending";
          title: string;
          user_id: string;
        };
        Insert: {
          client_id: number;
          created_at?: string;
          deadline?: string | null;
          id?: number;
          price?: number | null;
          status?: "active" | "completed" | "cancelled" | "pending";
          title: string;
          user_id?: string;
        };
        Update: {
          client_id?: number;
          created_at?: string;
          deadline?: string | null;
          id?: number;
          price?: number | null;
          status?: "active" | "completed" | "cancelled" | "pending";
          title?: string;
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
          status?: string;
          priority?: string;
          due_date?: string | null;
          project_id: number;
          user_id?: string;
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

      invoices: {
        Row: {
          id: number;
          client_id: number;
          user_id: string;
          invoice_date: string;
          due_date: string;
          amount: number;
          status: string;
          description: string | null;
          created_at: string;
        };
        Insert: {
          client_id: number;
          amount: number;
          invoice_date: string;
          due_date: string;
          status?: string;
          description?: string | null;
          user_id?: string;
        };
        Update: {
          id?: number;
          client_id?: number;
          amount?: number;
          invoice_date?: string;
          due_date?: string;
          status?: string;
          description?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "invoices_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "invoices_client_id_fkey";
            columns: ["client_id"];
            referencedRelation: "clients";
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
