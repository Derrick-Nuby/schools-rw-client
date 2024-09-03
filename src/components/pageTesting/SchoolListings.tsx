import React, { useEffect, useState, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import SyncLoader from 'react-spinners/SyncLoader';
import { searchSchools } from '../../api/searchSchools';
import { schoolContainer, schoolTitle, identifierSpan, districtSpan, colors, itemSpan, button, navButton } from '../styles';
import { ISchool } from '../../types/School';
import { SearchSchoolsParams } from '../../types/SearchSchoolsParams';

interface SchoolListingsProps {
    searchCriteria: SearchSchoolsParams;
}

const SchoolListings: React.FC<SchoolListingsProps> = ({ searchCriteria }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const sectionRef = useRef<HTMLDivElement>(null);

    const {
        data,
        error,
        isError,
        isPending,
        mutate
    } = useMutation({
        mutationFn: () => searchSchools({ ...searchCriteria, page: currentPage }),
        onSuccess: (data) => {
            console.log('Search Results:', data);
        },
        onError: (error) => {
            console.error('Search Error:', error);
        }
    });

    useEffect(() => {
        mutate();
        if (sectionRef.current) {
            sectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [currentPage, mutate, searchCriteria]);

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= data?.totalPages) {
            setCurrentPage(newPage);
        }
    };

    if (isPending) {
        return (
            <div className="flex justify-center items-center min-h-[80vh]">
                <SyncLoader color="#059377" size={25} />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center min-h-[80vh] text-red-600">
                {error instanceof Error ? error.message : 'An error occurred.'}
            </div>
        );
    }

    const schools = data?.schools || [];

    console.log(data);


    return (
        <section ref={sectionRef} className='my-28 mx-1 md:mx-9'>
            <div className='grid grid-rows-1 md:grid-cols-3 gap-9 justify-center'>
                {schools.map((school: ISchool) => (
                    <div className={`${schoolContainer}`} key={school._id}>
                        <p className={schoolTitle}>
                            <Link to={`/school/${school._id}`}>{school.school_name}</Link>
                        </p>
                        <p>
                            <span className={`${identifierSpan}`}>District:</span>
                            <span className={`${districtSpan}`}>
                                {school.district_name}
                            </span>
                        </p>
                        <p>
                            <span className={`${identifierSpan}`}>Levels:</span>
                            <span>
                                {school.combination_ids.map((combination, index: number) => (
                                    <span
                                        className={`${itemSpan}`}
                                        style={{ backgroundColor: colors[index % colors.length] }}
                                        key={combination._id}>
                                        {combination.abbreviation}
                                    </span>
                                ))}
                            </span>
                        </p>
                        <div className={`flex flex-col items-center`} >
                            <Link to={`/school/${school._id}`}>
                                <button className={button}>
                                    Full Details
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex justify-center mt-8'>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={navButton}
                >
                    Previous
                </button>
                <span className="mx-4 pt-2">Page {currentPage} of {data.pagination?.totalPages}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === data.pagination?.totalPages}
                    className={navButton}
                >
                    Next
                </button>
            </div>
        </section>
    );
};

export default SchoolListings;
