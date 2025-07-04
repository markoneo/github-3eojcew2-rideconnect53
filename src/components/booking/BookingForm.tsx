@@ .. @@
   const handleStepOneChange = (data: Partial<StepOneData>) => {
     setStepOneData(prev => ({ ...prev, ...data }));
   };
+
+  const handleReset = () => {
+    setStepOneData({
+      pickupAddress: '',
+      dropoffAddress: '',
+      date: '',
+      time: '',
+      passengers: 1,
+      priceEstimate: undefined
+    });
+    setStep(1);
+  };
 
   return (
     <div className="relative mx-auto transform">
@@ .. @@
               <BookingStepTwo
                 formData={stepTwoData}
                 locationData={{
                   pickupAddress: stepOneData.pickupAddress,
                   dropoffAddress: stepOneData.dropoffAddress,
                   date: stepOneData.date,
                   time: stepOneData.time,
                   priceEstimate: stepOneData.priceEstimate
                 }}
                 passengers={stepOneData.passengers}
                 onChange={handleStepTwoChange}
                 onSubmit={handleSubmit}
                 onBack={() => setStep(1)}
+                onReset={handleReset}
 
  )              />