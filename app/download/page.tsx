"use client";
import React from "react";
import Image from "next/image";
import { FaDownload, FaFilePdf } from "react-icons/fa";
import DesktopHeader from "@/shared/Header";

function DownloadPage() {
  // Manual download links from environment variables
  const manualDownloads = [
    {
      id: 1,
      title: "MPPT Solar Inverter - PV1000-12 - User Manual",
      description:
        "Complete user manual for MPPT Solar Inverter PV1000-12 model",
      fileSize: "2.5 MB",
      url: process.env.NEXT_APP_2KVA_USER_MANUAL,
      type: "PDF",
    },
    {
      id: 2,
      title: "Hybrid Solar Inverter - PV5000-24 - User Manual",
      description:
        "Complete user manual for Hybrid Solar Inverter PV5000-24 model",
      fileSize: "3.2 MB",
      url: process.env.NEXT_APP_3KVA_USER_MANUAL,
      type: "PDF",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <DesktopHeader isBannerPage />
      {/* Hero Section */}
      <div className="relative w-full h-64 md:h-80 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Product Manuals
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              Download user manuals and technical documentation
            </p>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <p className="text-gray-600 font-medium">HOME &gt; DOWNLOADS</p>
        </div>
      </div>

      {/* Downloads Section */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Available Manuals
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Access comprehensive user manuals and technical documentation for
            our solar energy products. All manuals are available in PDF format
            for easy download and offline reference.
          </p>
        </div>

        {/* Manuals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {manualDownloads.map((manual) => (
            <div
              key={manual.id}
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <FaFilePdf className="w-6 h-6 text-red-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                    {manual.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {manual.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {manual.fileSize}
                    </span>
                    <a
                      href={manual.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      download
                      className="inline-flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200 font-medium text-sm"
                    >
                      <FaDownload className="w-4 h-4" />
                      <span>Download PDF</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6 max-w-4xl mx-auto">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                Need Help?
              </h3>
              <p className="text-blue-700 text-sm">
                If you have any questions about our products or need technical
                support, please don't hesitate to contact our support team.
                We're here to help you get the most out of your solar energy
                system.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DownloadPage;
