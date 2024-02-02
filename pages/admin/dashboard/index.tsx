import React from "react";
import Authguard from "../../../src/guard/Authguard";
import Sidebar from "./Sidebar";
import ImagesSettings from "./images-settings";

const Dashboard: React.FC = () => {
    return (
        <Authguard>
            <Sidebar>
                <ImagesSettings />
            </Sidebar>
        </Authguard>
    );
};

export default Dashboard;
