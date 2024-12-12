import React from "react";

export default function Tutorial() {
  return (
    <>
      <div className="bg-gray-50 p-6">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Learn Japanese Language
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "https://www.youtube.com/embed/12VQYnuIgrM?si=uzL_E6zGpxtPl-ma",
            "https://www.youtube.com/embed/8LKSA-NvtgY?si=QRX9-dZjwuPcozdV",
            "https://www.youtube.com/embed/k-OTYdsLgCk?si=1s7-gq9mQcoG6od6",
            "https://www.youtube.com/embed/7NxQafrDS8s?si=YFLUM0TH0F75PCQm",
            "https://www.youtube.com/embed/1K196d_Xw3Q?si=2rO6k8xnWcjur_5Q",
            "https://www.youtube.com/embed/BnQR98XwGAg?si=lwi5CXmET0qUMOaS",
            "https://www.youtube.com/embed/yoRq8iMHqTU?si=jtupK70OplVoIIoE",
            "https://www.youtube.com/embed/IfUWs94G_l8?si=jM3jKHfDqoIif3Z8",
            "https://www.youtube.com/embed/FtTgvmR60Hw?si=hABUXag6-5G0Tqm_",
            "https://www.youtube.com/embed/norDsQf8d4Y?si=fxS8gixYGZUmwSje",
          ].map((url, index) => (
            <div key={index} className="aspect-w-16 aspect-h-9">
              <iframe
                className="h-full w-full rounded-lg shadow-lg"
                src={url}
                title={`Japanese Learning Video ${index + 1}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
