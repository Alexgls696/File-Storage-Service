import FilesSection from "../Sections/FilesSection/FilesSection";
import DownloadSection from "../Sections/DownloadSection/DownloadSection";
import ManagementSection from "../Sections/ManagementSection/ManagementSection";

import './Header.css'
import HeaderButton from "./HeaderButtons/HeaderButton";


export default function Header({setActiveSection}) {
    return (
        <header className="header">
            <h3>Сервис хранения файлов </h3>
            <HeaderButton onClick={() => {setActiveSection('files')}} name="Список файлов" />
            <HeaderButton onClick={() => {setActiveSection('download')}} name="Загрузка файлов" />
            <HeaderButton onClick={() => {setActiveSection('management')}} name="Управление" />
        </header>
    );
}