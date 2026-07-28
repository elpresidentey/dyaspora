import { Sidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-secondary/30">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
