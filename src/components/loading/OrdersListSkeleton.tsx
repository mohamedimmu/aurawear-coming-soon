import OrderCardSkeleton from "./OrderCardSkeleton";

interface OrdersListSkeletonProps {
  orderLimit?: number;
}

export default function OrdersListSkeleton({ orderLimit = 2 }: OrdersListSkeletonProps) {
  return (
    <div className="space-y-6">
      {[...Array(orderLimit)].map((_, index) => (
        <OrderCardSkeleton key={index} />
      ))}
    </div>
  );
}
