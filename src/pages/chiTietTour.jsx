import { useState, useEffect } from "react";
import "../styles/chiTietTour.css";
import numberComma from '.././resources/scripts/numberComma'

//import components
import BoxGioiThieu from "../components/PageChiTietTour/BoxGioiThieu";
import CTHoatDong from "../components/PageChiTietTour/CTHoatDong";
import DatTour from "../components/PageChiTietTour/DatTour";


const ChiTietTour = () => {
    //Lấy những query parameters
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let IDTour = params.get('IDTour');
    let TenTheLoai = params.get('TenTheLoai');

    const [Tour, setTour] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/tour/chiTiet/" + IDTour)
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                data[0].GiaNguoiLon = numberComma(data[0].GiaNguoiLon)
                setTour(data[0]);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const [KhungThoiGian, setKhungThoiGian] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/tour/chiTiet/khungThoiGian/" + IDTour)
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                setKhungThoiGian(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const [HinhAnhTour, setHinhAnhTour] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/tour/ListHinhAnh/" + IDTour)
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                setHinhAnhTour(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className="page-dattour">
            <BoxGioiThieu Tour={Tour} HinhAnhTour={HinhAnhTour} />
            <CTHoatDong Tour={Tour} />
            <DatTour Tour={Tour} KhungThoiGian={KhungThoiGian} />
        </div>
    );
};

export default ChiTietTour;
