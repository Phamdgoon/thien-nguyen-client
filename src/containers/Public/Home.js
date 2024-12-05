import React from "react";
import Header from "./Header";
import { SliderCustom } from "../../components";
import CampaignContent from "./CampaignContent";
import Footer from "./Footer";

const Home = () => {
    return (
        <div className="w-full flex flex-col gap-0 items-center">
            <Header />
            <SliderCustom />
            <CampaignContent />
            <Footer />
        </div>
    );
};

export default Home;
