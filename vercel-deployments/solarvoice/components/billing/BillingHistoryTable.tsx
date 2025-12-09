import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface Invoice {
  id: string;
  date: string;           // ISO date string
  description: string;    // e.g., "Professional Plan - December 2025"
  amount: number;         // Amount in cents (9900 = $99.00)
  status: 'paid' | 'pending' | 'failed';
}

interface BillingHistoryTableProps {
  invoices: Invoice[];
}

const BillingHistoryTable: React.FC<BillingHistoryTableProps> = ({ invoices }) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatAmount = (amountInCents: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amountInCents / 100);
  };

  const getStatusBadgeStyles = (status: Invoice['status']): string => {
    const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';

    switch (status) {
      case 'paid':
        return `${baseStyles} bg-green-100 text-green-800`;
      case 'pending':
        return `${baseStyles} bg-yellow-100 text-yellow-800`;
      case 'failed':
        return `${baseStyles} bg-red-100 text-red-800`;
      default:
        return baseStyles;
    }
  };

  const getStatusLabel = (status: Invoice['status']): string => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const handleDownloadInvoice = (invoiceId: string): void => {
    // Placeholder for download functionality
    console.log('Downloading invoice:', invoiceId);
    // TODO: Implement actual download logic
  };

  const handleDownloadAll = (): void => {
    // Placeholder for download all functionality
    console.log('Downloading all invoices');
    // TODO: Implement actual download all logic
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-semibold">Billing History</CardTitle>
        {invoices.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadAll}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download All
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {invoices.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No billing history available.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">
                    Description
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">
                    Status
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-sm text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {invoices.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="py-3 px-4 text-sm text-gray-900">
                      {formatDate(invoice.date)}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">
                      {invoice.description}
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">
                      {formatAmount(invoice.amount)}
                    </td>
                    <td className="py-3 px-4">
                      <span className={getStatusBadgeStyles(invoice.status)}>
                        {getStatusLabel(invoice.status)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleDownloadInvoice(invoice.id)}
                        className="text-sm text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded inline-flex items-center gap-1"
                      >
                        <Download className="h-3.5 w-3.5" />
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BillingHistoryTable;
