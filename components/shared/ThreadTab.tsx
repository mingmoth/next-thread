interface ThreadTabProps {
  currentUserId: string,
  accountId: string,
  accountType: string,
}

export default async function ThreadTab({
  currentUserId,
  accountId,
  accountType,
}: ThreadTabProps) {
  return (
    <div className="head-text">ThreadTab</div>
  )
}