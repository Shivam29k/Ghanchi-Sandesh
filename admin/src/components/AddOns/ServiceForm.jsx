import { type } from '@testing-library/user-event/dist/type';
import compressImage from '../../actions/compressImage';
import { useEffect, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

function ServiceForm({ updateId }) {
    const [loading, setLoading] = useState(false);
    const [service, setService] = useState({
        name: "",
        type: "",
        management: "",
        address: "",
        established_by: "",
        number: "",
        other: "",
        image: ""
    });

    const navigate = useNavigate();

    const serviceTypes = [
        ["समाज भवन", 'hall'],
        ["समाज छात्रावास", 'hostel'],
        ["एम्बूलैस सेवा", 'ambulance'],
        ["समाज के मदिर", 'mandir']
    ];

    // for image
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const base64String = await readFileAsUrl(file);
            setService({ ...service, image: base64String });
        }
    };

    const readFileAsUrl = async (file) => {
        const compressedFile = await compressImage(file);
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(compressedFile);
        });
    };

    // for fetching data of the service to be updated and setting it in the form
    const fetchServiceData = async (updateId) => {
        if (!updateId) {
            alert('No id provided for fetching service data.');
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/get-gs-social-service`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: updateId })
            });
            const result = await res.json();
            if (res.status === 200) {
                console.log('Fetched service:', result)
                setService(result.response);
            } else {
                alert(result.msg);
            }
        } catch (error) {
            console.error('Error fetching service:', error);
        } finally {
            setLoading(false);
        }
    }

    // function for updating the data of the service
    const updateService = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/update-gs-social-service`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: updateId, service: service })
            });
            const result = await res.json();
            if (res.status === 200) {
                alert(result.msg);
                navigate('/add-ons');
            } else {
                alert(result.msg);
            }
        } catch (error) {
            console.error('Error updating service:', error);
            alert('An error occurred while updating the service. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (updateId) {
            fetchServiceData(updateId);
        }
    }, [updateId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setService({
            ...service,
            [name]: value
        });
    };

    // function for creating a new service
    const createService = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/create-gs-social-service`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...service })
            });
            const result = await res.json();
            if (res.status === 200) {
                alert(result.msg);
                navigate('/add-ons');
            } else {
                alert(result.msg);
            }
        } catch (error) {
            console.error('Error creating service:', error);
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (updateId) {
            updateService();
        } else {
            createService();
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='w-[90vw] md:w-[70vw]'>
                <div className='py-2'>
                    <div className='font-semibold'>Name</div>
                    <input
                        type="text"
                        name="name"
                        value={service.name}
                        onChange={handleChange}
                        required
                        className='border rounded p-1 w-full'
                        placeholder='Enter Name of Service'
                    />
                </div>

                <div className='py-2'>
                    <div className='font-semibold'>Type</div>
                    <select
                        name="type"
                        value={service.type}
                        onChange={handleChange}
                        required
                        className='border rounded p-1 w-full'
                    >
                        <option value="">Select a type</option>
                        {serviceTypes.map(([label, value]) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                </div>
                
                <div className='py-2'>
                    <div className='font-semibold'>Management / संचालन:</div>
                    <input
                        type="text"
                        name="management"
                        value={service.management}
                        onChange={handleChange}
                        required
                        className='border rounded p-1 w-full'
                        placeholder='Enter Management'
                    />
                </div>
                <div className='py-2'>
                    <div className='font-semibold'>Address / पता:</div>
                    <textarea
                        name="address"
                        value={service.address}
                        onChange={handleChange}
                        required
                        className='border rounded p-1 w-full'
                        placeholder='Enter address'
                    />
                </div>
                <div className='py-2'>
                    <div className='font-semibold'>Established By / व्यवस्थापक:</div>
                    <input
                        type="text"
                        name="established_by"
                        value={service.established_by}
                        onChange={handleChange}
                        required
                        className='border rounded p-1 w-full'
                        placeholder='Enter who established this service'
                    />
                </div>
                <div className='py-2'>
                    <div className='font-semibold'>Contact Number / मोबाइल नं:</div>
                    <input
                        type="text"
                        name="number"
                        value={service.number}
                        onChange={handleChange}
                        required
                        className='border rounded p-1 w-full'
                        placeholder='Enter contact number'
                    />
                </div>
                <div className='py-2'>
                    <div className='font-semibold'>Other Information / अन्य:</div>
                    <textarea
                        name="other"
                        value={service.other}
                        onChange={handleChange}
                        className='border rounded p-1 w-full'
                        placeholder='Enter any other information'
                    />
                </div>
                <div className='py-2'>
                    <div className='font-semibold'>Image</div>
                    <input
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                        required={!updateId}
                        className='border rounded p-1'
                        accept="image/*"
                    />
                    {service.image && service.image.length > 5 &&
                        <div className='m-2'>
                            <img src={service.image} alt="Service" className='max-w-[200px] max-h-[200px] object-contain rounded' />
                        </div>
                    }
                </div>
                <button
                    type='submit'
                    className='bg-green-500 text-white font-bold p-2 rounded-md ml-auto'
                    disabled={loading}
                >
                    {loading ? <RotatingLines height="30" width="30" strokeColor="white" /> : (updateId ? 'Update' : 'Submit')}
                </button>
            </form>
        </div>
    );
}

export default ServiceForm;