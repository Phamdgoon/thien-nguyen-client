import icons from "./icons";

const { ImPencil2, MdOutlineVolunteerActivism, MdCampaign } = icons;

const menuSidebarOrganization = [
    {
        id: 1,
        text: "Tạo mới chiến dịch",
        path: "/to-chuc/tao-moi-chien-dich",
        icon: <ImPencil2 />,
    },
    {
        id: 2,
        text: "Quản lý chiến dịch",
        path: "/to-chuc/quan-ly-chien-dich",
        icon: <MdCampaign />,
    },
    {
        id: 3,
        text: "Quản lý tình nguyện viên",
        path: "/to-chuc/quan-ly-tinh-nguyen-vien",
        icon: <MdOutlineVolunteerActivism />,
    },
    {
        id: 4,
        text: "Quản lý ủng hộ",
        path: "/to-chuc/quan-ly-ung-ho",
        icon: <MdOutlineVolunteerActivism />,
    },
];

export default menuSidebarOrganization;
