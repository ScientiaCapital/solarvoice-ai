import SidebarLayout from '@/components/layouts/SidebarLayout'

export default function BillingLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return <SidebarLayout>{children}</SidebarLayout>
}
