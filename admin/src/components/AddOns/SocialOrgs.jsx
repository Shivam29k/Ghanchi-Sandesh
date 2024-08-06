import React, { useEffect, useState } from 'react'
import { FaEdit, FaMinus, FaPlus } from 'react-icons/fa'
import { RotatingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { MdDeleteForever } from 'react-icons/md';
import AddOrg from './AddOrg';

function SocialOrgs() {
    const navigate = useNavigate(); 
    return (
        <div className='flex flex-col items-center p-2'>
            <button className='flex items-center gap-1 font-bold bg-red-300 rounded-md px-2 py-1'
                onClick={() => navigate('/add-org')}
            >
                Add सामाजिक संस्थाएँ <FaPlus /> 
            </button>
            <ListOrgs />
        </div>
    )
}

function ListOrgs() {
    const [orgs, setOrgs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrgs = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/get-all-gs-social-orgs-name`);
            const result = await res.json();
            if (res.status === 200) {
                console.log('Fetched orgs:', result)
                setOrgs(result);
            } else {
                alert(result.msg);
            }
        } catch (error) {
            console.error('Error fetching orgs:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrgs();
    }, []);

    const navigate = useNavigate();

    const deleteOrg = async (id, name) => {
        try {
            setLoading(true);
            const confirm = window.confirm('Are you sure you want to delete ' + name + ' ?');
            if (confirm) {
                const res = await fetch(`${process.env.REACT_APP_BASE_URL}/delete-gs-social-org`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id })
                });
                const result = await res.json();
                if (res.status === 200) {
                    // alert(result.msg);
                    setOrgs(orgs.filter(org => org._id !== id));
                } else {
                    alert(result.msg);
                }
            }
        } catch (error) {
            console.error('Error deleting org:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {loading ? <RotatingLines height="30" width="30" strokeColor="black" /> :
                <div className='text-lg'>
                    <p className='w-[100vw] text-center py-2 font-semibold text-xl'>
                        Total Orgs - {orgs.length}
                    </p>
                    <div  className='flex flex-col '>
                    {orgs.map((org, index) => (
                        <div key={org._id} className='flex justify-around w-[100vw] p-2 gap-1 md:px-14 border'>
                            <p className='font-bold pr-3 flex'>{index + 1}</p>
                            <h2 className='w-full font-semibold'>{org.name}</h2>
                            <FaEdit color='green' className='cursor-pointer' size={25} onClick={()=>navigate('/edit-org/'+org._id)} />
                            <MdDeleteForever color='red' size={25} className='cursor-pointer'
                            onClick={() => deleteOrg(org._id, org.name)}
                            />
                        </div>
                    ))}
                    </div>
                </div>}
        </>
    );
}



export default SocialOrgs