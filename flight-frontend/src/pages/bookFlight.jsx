import GlassCard from '../components/GlassCard';

export default function UserDashboard() {
  return (
    <div className="space-y-4">
      <GlassCard>
        <h3 className="font-semibold">User Dashboard</h3>
        <p className="text-slate-300">Upcoming trips and bookings.</p>
      </GlassCard>
    </div>
  );
}