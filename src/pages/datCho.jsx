import server from '../serverAddress'
import '../styles/datCho.css'
import { useState, useEffect } from "react"

//COMPONENTS
import ThongTinLienHe from '../components/PageDatCho/ThongTinLienHe'
import ThongTinKhach from '../components/PageDatCho/ThongTinKhach'
import BoxTourDat from '../components/PageDatCho/BoxTourDat'
import ThoiGianTQ from '../components/PageDatCho/ThoiGianTQ'
import TomTat from '../components/PageDatCho/TomTat'

const axios = require('axios');

const DatCho = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);

    const IDTour = params.get('idTour');
    const ngayDi = params.get('ngayDi');
    const soNguoiLon = params.get('soNguoiLon');
    const soTreEm = params.get('soTreEm');
    const idKhungGio = params.get('idKhungGio');

    const [Tour, setTour] = useState([]);
    useEffect(() => {
        fetch(server + "/tour/chiTiet/" + IDTour)
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                setTour(data[0]);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const [KhungThoiGian, setKhungThoiGian] = useState([]);
    useEffect(() => {
        fetch(server + "/khungThoiGian/" + idKhungGio)
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                setKhungThoiGian(data[0]);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const xacNhanDatTour = (e) => {
        e.preventDefault()

        const hoTen = document.getElementById('input-hoTen').value
        const dienThoai = document.getElementById('input-dienThoai').value
        const email = document.getElementById('input-email').value
        let loaiKhach

        const hoTenChung = document.getElementById('input-hoTen-chung').value
        const dienThoaiChung = document.getElementById('input-dienThoai-chung').value
        const emailChung = document.getElementById('input-email-chung').value
        const danhXung = document.getElementById('danhXung').value

        const radios = document.getElementsByName('loaiKhach')

        // loop through list of radio buttons
        for (var i = 0, len = radios.length; i < len; i++) {
            if (radios[i].checked) { // radio checked?
                loaiKhach = radios[i].value; // if so, hold its value in val
                break; // and break out of for loop
            }
        }

        loaiKhach === "khachTQ" ? loaiKhach = 1 : loaiKhach = 0

        if (!hoTen || !dienThoai || !email || !loaiKhach || !hoTenChung || !dienThoaiChung || !emailChung || !danhXung) {
            alert('Vui l??ng ??i???n ?????y ????? th??ng tin !')
            return
        }
        else {
            if (window.confirm('X??c nh???n ?????t tour ?')) {
                axios.post(server + '/datTour', {
                    DanhXung: danhXung,
                    HoTen: hoTen,
                    SoDienThoai: dienThoai,
                    Email: email,
                    LaKhachThamQuan: loaiKhach,
                    NgayDi: ngayDi,

                    HoTenChung: hoTenChung,
                    SoDienThoaiChung: dienThoaiChung,
                    EmailChung: emailChung,
                    SoLuongNguoiLon: soNguoiLon,
                    SoLuongTreEm: soTreEm,
                    TongTien: Tour.GiaNguoiLon * soNguoiLon + Tour.GiaTreEm * soTreEm,
                    IDTour: IDTour
                })
                    .then(() => {
                        window.location.reload()
                    })
                    .catch(err => alert(err))
            }
        }
    }

    return (
        <div>
            <div className="main-index-body">
                <h1>?????t ch??? c???a t??i</h1>
                <h4>??i???n th??ng tin v?? xem l???i ?????t ch???.</h4>
                <BoxTourDat
                    Tour={Tour} ngayDi={ngayDi} soNguoiLon={soNguoiLon}
                    soTreEm={soTreEm} KhungThoiGian={KhungThoiGian}
                />
                <ThongTinLienHe />
                <ThongTinKhach />
                <ThoiGianTQ ngayDi={ngayDi} />
                <TomTat Tour={Tour} soNguoiLon={soNguoiLon} soTreEm={soTreEm} />

                <button className="btn-tiepTuc" onClick={e => xacNhanDatTour(e)}>Ti???p t???c</button>
            </div>
        </div>
    )
}

export default DatCho
