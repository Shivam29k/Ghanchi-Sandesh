import compressImage from '../../actions/compressImage';
import { useEffect, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';



function OrgForm({ updateId }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        logo: '',
        address: '',
        contact: '',
        chairman: '',
        work: '',
        images: []
    });

    const navigate = useNavigate();

    // for images
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const base64String = await readFileAsUrl(file);
            setFormData({ ...formData, logo: base64String });
        }
    };
    const handleMultipleFileChange = async (e) => {
        const files = e.target.files;
        const base64Strings = await Promise.all(
            Array.from(files).map(async (file) => {
                return await readFileAsUrl(file);
            })
        );
        setFormData({ ...formData, images: base64Strings });
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


    // for fetching data of the org to be updated and setting it in the form
    const fetchOrgData = async (updateId) => {
        if (!updateId) {
            alert('No id provided for fetching org data..');
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/get-gs-social-org`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: updateId })
            });
            const result = await res.json();
            if (res.status === 200) {
                console.log('Fetched org:', result)
                setFormData(result.response);
            } else {
                alert(result.msg);
            }
        } catch (error) {
            console.error('Error fetching org:', error);
        } finally {
            setLoading(false);
        }
    }

    // function for updating the data of the org
    const updateOrg = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/update-gs-social-org`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: updateId, org: formData })
            });
            const result = await res.json();
            if (res.status === 200) {
                alert(result.msg);
                navigate('/add-ons');
            } else {
                alert(result.msg);
            }
        } catch (error) {
            console.error('Error updating org:', error);
            alert('An error occurred while updating the organization. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (updateId) {
            fetchOrgData(updateId);
        }
    }, [updateId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // function for creating a new org
    const createOrg = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/create-gs-social-org`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData })
            });
            const result = await res.json();
            if (res.status === 200) {
                alert(result.msg);
                navigate('/add-ons');
            } else {
                alert(result.msg);
            }
        } catch (error) {
            console.error('Error creating org:', error);
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (updateId) {
            updateOrg();
        } else {
            createOrg();
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
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className='border rounded p-1 w-full'
                        placeholder='Enter Name of Org..'
                    />
                </div>
                <div className='py-2'>
                    <div className='font-semibold'>Logo</div>
                    <input
                        type="file"
                        name="logo"
                        onChange={handleFileChange}
                        required = {!updateId}
                        className='border rounded p-1'
                        accept="image/*"
                    />
                    {formData.logo && formData.logo.length > 5 &&
                        <div className='m-2'>
                            <img src={formData.logo} alt="Logo" className='max-w-[200px] max-h-[200px] object-contain rounded' />
                        </div>
                    }
                </div>
                <div className='py-2'>
                    <div className='font-semibold'>Office Address / कार्यालय:</div>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className='border rounded p-1 w-full'
                        placeholder='Enter office address..'
                    />
                </div>
                <div className='py-2'>
                    <div className='font-semibold'>Contact Number / मोबाइल नं:</div>
                    <input
                        type="text"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        required
                        className='border rounded p-1 w-full'
                        placeholder='Enter contact number..'
                    />
                </div>
                <div className='py-2'>
                    <div className='font-semibold'>Chairman / Head / अध्यक्ष:</div>
                    <input
                        type="text"
                        name="chairman"
                        value={formData.chairman}
                        onChange={handleChange}
                        required
                        className='border rounded p-1 w-full'
                        placeholder='Enter chairman name..'
                    />
                </div>
                <div className='py-2'>
                    <div className='font-semibold'>Work / कार्य:</div>
                    <textarea
                        name="work"
                        value={formData.work}
                        onChange={handleChange}
                        required
                        className='border rounded p-1 w-full'
                        placeholder='Enter work you do..'
                    />
                </div>
                {/* taking multiple images and storing them in a list */}
                <div className='py-2'>
                    <div className='font-semibold'>Images</div>
                    <input
                        type='file'
                        name='images'
                        accept='image/*'
                        multiple
                        onChange={handleMultipleFileChange}
                        className='border rounded p-1'
                    />
                    <div className='flex flex-col gap-2 py-2'>
                        {formData.images && formData.images.map((img, index) => (
                            <img key={index} src={img} alt={`Image ${index + 1}`} className='max-w-[300px] max-h-[200px] object-contain rounded' />
                        ))}
                    </div>
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

export default OrgForm;