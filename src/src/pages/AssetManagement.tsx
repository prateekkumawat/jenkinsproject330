
import React from "react";
import { Routes, Route } from "react-router-dom";
import AnimatedTransition from "@/components/AnimatedTransition";

// Import the asset components
import AssetRegistration from "@/components/assets/AssetRegistration";
import AssetAllocation from "@/components/assets/AssetAllocation";
import RequestAsset from "@/components/assets/RequestAsset";
import ReturnAsset from "@/components/assets/ReturnAsset";
import AssetTracking from "@/components/assets/AssetTracking";
import AllocatedAssetsView from "@/components/assets/AllocatedAssetsView";
import LostDamagedAssets from "@/components/assets/LostDamagedAssets";
import AssetManagementOverview from "@/components/assets/AssetManagementOverview";
import BreadcrumbNav from "@/components/BreadcrumbNav";

const AssetManagement: React.FC = () => {
  return (
    <AnimatedTransition>
      <div className="w-full">
        <div className="w-full">
          <div className="mx-auto">
            <Routes>
              <Route index element={<AssetManagementOverview />} />
              <Route 
                path="registration" 
                element={
                  <>
                    <BreadcrumbNav 
                      title="Asset Registration" 
                      backTo="/dashboard/assets" 
                      backLabel="Asset Management" 
                    />
                    <AssetRegistration />
                  </>
                } 
              />
              <Route 
                path="allocation" 
                element={
                  <>
                    <BreadcrumbNav 
                      title="Asset Allocation" 
                      backTo="/dashboard/assets" 
                      backLabel="Asset Management" 
                    />
                    <AssetAllocation />
                  </>
                } 
              />
              <Route 
                path="requests" 
                element={
                  <>
                    <BreadcrumbNav 
                      title="Request Asset" 
                      backTo="/dashboard/assets" 
                      backLabel="Asset Management" 
                    />
                    <RequestAsset />
                  </>
                } 
              />
              <Route 
                path="tracking" 
                element={
                  <>
                    <BreadcrumbNav 
                      title="Asset Tracking" 
                      backTo="/dashboard/assets" 
                      backLabel="Asset Management" 
                    />
                    <AssetTracking />
                  </>
                } 
              />
              <Route 
                path="allocated" 
                element={
                  <>
                    <BreadcrumbNav 
                      title="Allocated Assets" 
                      backTo="/dashboard/assets" 
                      backLabel="Asset Management" 
                    />
                    <AllocatedAssetsView />
                  </>
                } 
              />
              <Route 
                path="return" 
                element={
                  <>
                    <BreadcrumbNav 
                      title="Return Asset" 
                      backTo="/dashboard/assets" 
                      backLabel="Asset Management" 
                    />
                    <ReturnAsset />
                  </>
                } 
              />
              <Route 
                path="damaged" 
                element={
                  <>
                    <BreadcrumbNav 
                      title="Lost/Damaged Assets" 
                      backTo="/dashboard/assets" 
                      backLabel="Asset Management" 
                    />
                    <LostDamagedAssets />
                  </>
                } 
              />
            </Routes>
          </div>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default AssetManagement;
