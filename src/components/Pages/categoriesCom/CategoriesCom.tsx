import React, { useEffect, useState } from 'react'
import LeftSideIcon from '../../../assets/drawer/LeftSideIcon.png'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'redux/store';
import { getAllCategory } from "../../../redux/slice/categorySlice";
import { useNavigate } from 'react-router-dom';

export default function CategoriesCom() {
    const { category } = useSelector((state: RootState) => state.category);
    const [categoryData, setCategoryData] = useState<any>([]);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(getAllCategory());
    }, []);

    useEffect(() => {
        setCategoryData(category);
    }, [category]);

    return (
        <div className='categoryPage'>
            <div className='categoryTop'>
                <div className='categoryTopDetail'>
                    <div className='boxcategoryTopDetail' onClick={() => navigate("/user/home")}>
                        <img src={LeftSideIcon} />
                    </div>
                    <span>Category</span>
                </div>
            </div>
            <div className='categoryBoxPage'>
                {
                    categoryData?.map((item: any, index: number) => {
                        return (
                            <>
                                <div key={index} className='categoryBoxShowName'>{item?.name}</div>
                            </>
                        )
                    })
                }
            </div>
        </div>
    )
}
