interface TodoStatsProps {
  total: number;
  completed: number;
}

export const TodoStats = ({ total, completed }: TodoStatsProps) => {
  const remaining = total - completed;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="text-center p-4 bg-card rounded-lg border">
        <div className="text-2xl font-bold">{total}</div>
        <div className="text-sm text-muted-foreground">Total</div>
      </div>
      <div className="text-center p-4 bg-card rounded-lg border">
        <div className="text-2xl font-bold">{completed}</div>
        <div className="text-sm text-muted-foreground">Completed</div>
      </div>
      <div className="text-center p-4 bg-card rounded-lg border">
        <div className="text-2xl font-bold">{remaining}</div>
        <div className="text-sm text-muted-foreground">Remaining</div>
      </div>
    </div>
  );
};