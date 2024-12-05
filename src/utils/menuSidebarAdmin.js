import icons from "./icons";

const { MdCampaign, GrOrganization, BsPersonCircle, TbReport } = icons;

const menuSidebarAdmin = [
    {
        id: 1,
        text: "Quản lý chiến dịch",
        path: "/system/quan-ly-chien-dich-admin",
        icon: <MdCampaign />,
    },
    {
        id: 2,
        text: "Quản lý tổ chức",
        path: "/system/quan-ly-to-chuc-admin",
        icon: <GrOrganization />,
    },
    {
        id: 3,
        text: "Quản lý người dùng",
        path: "/system/quan-ly-nguoi-dung-admin",
        icon: <BsPersonCircle />,
    },
    {
        id: 4,
        text: "Báo cáo",
        path: "/system/quan-ly-bao-cao-admin",
        icon: <TbReport />,
    },
];

export default menuSidebarAdmin;
