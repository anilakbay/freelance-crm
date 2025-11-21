export interface Client {
  id: number;
  created_at: string;
  name: string;
  email: string | null;
  phone: string | null;
  status: "active" | "passive" | "pending";
}
