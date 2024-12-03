import { useSelector } from 'react-redux';
import { isLoading, isSkeleton } from './allSelector';
import '../main.css'


const Loader = () => {


    const roleLoader = useSelector(isLoading)
    const isSkeletonLoader = useSelector(isSkeleton)

    return (
        <>
            {roleLoader || isSkeletonLoader && (
                <div className='loader'>
                    <div className='loaderShow'>
                        <div className="three-body">
                            <div className="three-body__dot"></div>
                            <div className="three-body__dot"></div>
                            <div className="three-body__dot"></div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Loader;