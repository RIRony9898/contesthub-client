import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/UseContext";
import axiosInstance from "../utils/api/axios.jsx";

const Payment = () => {
  const { auth } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  // If redirected from checkout, show status
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get("status");
    if (status === "success") {
      toast.success("Payment successful — registration complete!");
    } else if (status === "cancel") {
      toast.error("Payment canceled.");
    }
  }, [location.search]);

  const mutation = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosInstance.post(
        "/api/payments/create-session",
        payload
      );
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.url) {
        window.location.href = data.url;
      } else {
        toast.error("Failed to start payment session");
      }
      setProcessing(false);
    },
    onError: (err) => {
      console.error(err);
      toast.error("Payment failed: " + (err?.message || "Unknown"));
      setProcessing(false);
    },
  });

  const handlePay = (e) => {
    e.preventDefault();
    if (!auth.user) {
      toast.error("Please login to proceed to payment");
      navigate("/login");
      return;
    }

    // Accept contestId and price via state (from details page) or query params
    const params = new URLSearchParams(location.search);
    const contestId =
      params.get("contestId") || (location.state && location.state.contestId);
    const price =
      params.get("price") || (location.state && location.state.price) || 5;

    if (!contestId) {
      toast.error("No contest selected for payment");
      return;
    }

    setProcessing(true);
    mutation.mutate({
      contestId,
      price,
      userEmail: auth.user.email,
      username: auth.user.displayName,
      userId: auth.user.uid,
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-semibold mb-4">Contest Payment</h2>

      <div className="bg-white shadow rounded p-6">
        <p className="mb-4">Secure payment powered by Stripe (test mode).</p>

        <form onSubmit={handlePay}>
          <div className="mb-4">
            <label className="block mb-1">Selected Contest</label>
            <input
              type="text"
              readOnly
              value={
                new URLSearchParams(location.search).get("contestId") ||
                (location.state && location.state.contestId) ||
                "(not specified)"
              }
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Amount (USD)</label>
            <input
              type="text"
              readOnly
              value={
                new URLSearchParams(location.search).get("price") ||
                (location.state && location.state.price) ||
                "5"
              }
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <button
            disabled={processing}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {processing ? "Processing…" : "Pay & Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
