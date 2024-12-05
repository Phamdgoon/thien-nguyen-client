import { Routes, Route, Navigate } from "react-router-dom";
import { path } from "./utils/constant";
import {
    CampaignCategory,
    DetailCampaign,
    DetailRegisterCampaign,
    Home,
    Login,
} from "./containers/Public";
import {
    System,
    LoginSystem,
    Profile,
    Organization,
    LoginOrganization,
    ManageCampaign,
    ManageVolunteer,
    ManageCampaignAdmin,
    ManageOrganization,
    ManageUser,
    Report,
} from "./containers/System";
import ProjectCampaign from "./containers/Public/ProjectCampaign";
import CreateCampaign from "./containers/System/CreateCampaign";

function App() {
    return (
        <div className="bg-primary overflow-hidden">
            <Routes>
                <Route path={path.HOME} element={<Home />} />
                <Route path={path.LOGIN} element={<Login />} />
                <Route
                    path={path.CATEGORY_CAMPAIGNS}
                    element={<CampaignCategory />}
                />
                <Route
                    path={path.DETAIL_CAMPAIGN_TITLE_CAMPAIGNID}
                    element={<DetailCampaign />}
                />
                <Route
                    path={path.PROJECT_CAMPAIGN}
                    element={<ProjectCampaign />}
                />

                <Route path={path.SYSTEM} element={<System />}>
                    <Route
                        path={path.MANAGE_CAMPAIGN_ADMIN}
                        element={<ManageCampaignAdmin />}
                    />
                    <Route
                        path={path.MANAGE_ORGANIZATION_ADMIN}
                        element={<ManageOrganization />}
                    />
                    <Route
                        path={path.MANAGE_USER_ADMIN}
                        element={<ManageUser />}
                    />
                    <Route path={path.MANAGE_REPORT} element={<Report />} />
                </Route>
                <Route path={path.ORGANIZATION} element={<Organization />}>
                    <Route
                        path={path.CREATE_CAMPAIGN}
                        element={<CreateCampaign />}
                    />
                    <Route
                        path={path.MANAGE_CAMPAIGN}
                        element={<ManageCampaign />}
                    />
                    <Route
                        path={path.MANAGE_VOLUNTEER}
                        element={<ManageVolunteer />}
                    />
                </Route>
                <Route path={path.LOGIN_SYSTEM} element={<LoginSystem />} />
                <Route
                    path={path.LOGIN_ORGANIZATION}
                    element={<LoginOrganization />}
                />

                <Route path={path.PROFILE} element={<Profile />} />
                <Route
                    path={path.DETAIL_REGISTER_CAMPAIGN}
                    element={<DetailRegisterCampaign />}
                />
            </Routes>
        </div>
    );
}

export default App;
