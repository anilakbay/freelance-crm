export interface Project {
  id: number;
  created_at: string;
  client_id: number;
  title: string;
  price: number | null;
  deadline: string | null;
  status: "active" | "completed" | "cancelled" | "pending";
  clients?: {
    name: string;
    email: string;
  };
}
