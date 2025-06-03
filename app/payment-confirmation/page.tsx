// app/payment-confirmation/page.tsx
"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import NextImage from 'next/image';
import { Button } from "@/components/ui/button"; // Adjust path as per your project
import { Loader2, AlertTriangle, CheckCircleIcon, Download, Home } from "lucide-react";
import FooterSection from "@/components/footer-section"; // Adjust path

interface Ebook {
  _id: string;
  title: string;
  description: string;
  price: number;
  pages: number;
  image: string;
  category: string;
  slug: string;
  pdfFileUrl?: string;
  razorpayPaymentLink?: string;
}

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api` || "http://localhost:5001/api";
const SESSION_STORAGE_KEY_PENDING_PURCHASE_EBOOK_ID = 'rp_pending_purchase_ebook_id';

function PaymentConfirmationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [purchasedEbook, setPurchasedEbook] = useState<Ebook | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const paymentStatus = searchParams.get('status');
    const razorpayPaymentId = searchParams.get('payment_id');
    // const razorpayOrderId = searchParams.get('order_id'); // If needed for backend verification

    const pendingEbookId = sessionStorage.getItem(SESSION_STORAGE_KEY_PENDING_PURCHASE_EBOOK_ID);

    const processPayment = async () => {
      if (!paymentStatus || !razorpayPaymentId) {
        setError("Payment details are missing from the redirect URL. Please contact support if you made a purchase.");
        setIsLoading(false);
        sessionStorage.removeItem(SESSION_STORAGE_KEY_PENDING_PURCHASE_EBOOK_ID); // Clean up session
        return;
      }

      try {
        if (paymentStatus === 'success') {
          if (!pendingEbookId) {
            setError("Could not identify the purchased item. If payment was successful, please contact support.");
            console.warn("Payment success, but no pendingEbookId in session.");
            return;
          }

          // OPTIONAL BUT HIGHLY RECOMMENDED: Backend verification step
          // const verifyResponse = await fetch(`${API_BASE_URL}/payment/razorpay-verify`, {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify({ razorpay_payment_id: razorpayPaymentId, expected_ebook_id: pendingEbookId })
          // });
          // const verifyData = await verifyResponse.json();
          // if (!verifyResponse.ok || !verifyData.success) {
          //   throw new Error(verifyData.error || 'Payment verification failed with backend.');
          // }
          // const verifiedEbookDetails = verifyData.ebook; // Assuming backend returns ebook details

          // For now, fetching all ebooks to find the one (less optimal for many ebooks)
          // Ideally, your backend verification would return the specific ebook details
          const response = await fetch(`${API_BASE_URL}/ebooks`);
          if (!response.ok) throw new Error("Failed to fetch e-book details.");
          const ebookData = await response.json();

          if (ebookData.success && Array.isArray(ebookData.data)) {
            const ebook = ebookData.data.find((eb: Ebook) => eb._id === pendingEbookId);
            if (ebook) {
              setPurchasedEbook(ebook);
              setSuccessMessage(`Your purchase of "${ebook.title}" was successful!`);
            } else {
              setError("Payment successful, but there was an issue retrieving your e-book details. Please contact support.");
              console.error("Payment success, but pendingEbookId not found in fetched ebooks:", pendingEbookId);
            }
          } else {
            throw new Error(ebookData.error || "Could not parse e-book data.");
          }

        } else if (paymentStatus === 'failed') {
          const reason = searchParams.get('reason');
          setError(`Payment was unsuccessful.${reason ? ` Reason: ${reason}` : ''}. Please try again or contact support.`);
        } else {
          setError("Invalid payment status received.");
        }
      } catch (err: any) {
        console.error("Error processing payment confirmation:", err);
        setError("An error occurred while processing your payment: " + (err.message || "Unknown error."));
      } finally {
        sessionStorage.removeItem(SESSION_STORAGE_KEY_PENDING_PURCHASE_EBOOK_ID);
        setIsLoading(false);
        // Clean up URL query parameters
        const currentPathname = window.location.pathname;
        router.replace(currentPathname, { scroll: false });
      }
    };

    processPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // searchParams and router are stable, effect runs once on mount.

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-pink-600">
        <Loader2 className="h-12 w-12 animate-spin mb-4" />
        <p className="text-xl">Verifying your payment, please wait...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 text-center min-h-[calc(100vh-200px)] flex flex-col items-center justify-center">
      {error && (
        <div className="bg-red-50 p-8 rounded-lg shadow-lg max-w-lg w-full">
          <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-6" />
          <h1 className="text-2xl font-semibold text-red-700 mb-3">Payment Issue</h1>
          <p className="text-gray-700 mb-8">{error}</p>
          <Button onClick={() => router.push('/library')} className="bg-red-600 hover:bg-red-700 text-white">
            <Home className="mr-2 h-4 w-4" /> Go to Library
          </Button>
        </div>
      )}

      {successMessage && purchasedEbook && (
        <div className="bg-green-50 p-8 rounded-lg shadow-lg max-w-lg w-full">
          <CheckCircleIcon className="h-16 w-16 text-green-600 mx-auto mb-6" />
          <h1 className="text-2xl font-semibold text-green-700 mb-3">Thank You for Your Purchase!</h1>
          <p className="text-gray-700 mb-4">{successMessage}</p>
          
          {purchasedEbook.image && (
            <div className="my-6">
              <NextImage 
                src={purchasedEbook.image} 
                alt={purchasedEbook.title} 
                width={150} 
                height={200} 
                className="mx-auto rounded-md shadow-md object-cover" 
                unoptimized={purchasedEbook.image?.includes("cloudinary") ? true : false}
              />
            </div>
          )}

          {purchasedEbook.pdfFileUrl ? (
            <a
              href={purchasedEbook.pdfFileUrl}
              target="_blank"
              rel="noopener noreferrer"
              download={`${purchasedEbook.title.replace(/[^a-zA-Z0-9\s]/g, '') || 'ebook'}.pdf`}
              className="w-full inline-block"
            >
              <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white text-lg py-3">
                <Download className="mr-2 h-5 w-5" /> Download: {purchasedEbook.title}
              </Button>
            </a>
          ) : (
            <p className="text-yellow-600 bg-yellow-50 p-3 rounded-md">
              Your e-book is confirmed! The download link is being prepared. Please check your email shortly, or contact support if you don't receive it.
            </p>
          )}
          <Button variant="outline" onClick={() => router.push('/library')} className="mt-8">
             Continue Browsing Library
          </Button>
        </div>
      )}

      {!isLoading && !error && !successMessage && (
         <div className="bg-gray-50 p-8 rounded-lg shadow-lg max-w-lg w-full">
            <h1 className="text-2xl font-semibold text-gray-700 mb-3">Payment Status</h1>
            <p className="text-gray-600">No payment information to display. If you've made a purchase and landed here, please contact support.</p>
            <Button onClick={() => router.push('/library')} className="mt-6">
                Go to Library
            </Button>
        </div>
      )}
    </div>
  );
}

export default function PaymentConfirmationPage() {
  return (
    <>
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center min-h-screen text-pink-600">
          <Loader2 className="h-12 w-12 animate-spin mb-4" />
          <p className="text-xl">Loading page...</p>
        </div>
      }>
        <PaymentConfirmationContent />
      </Suspense>
      <FooterSection />
    </>
  );
}