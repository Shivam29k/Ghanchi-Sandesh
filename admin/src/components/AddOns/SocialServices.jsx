import React, { useEffect, useState } from 'react'
import { FaEdit, FaPlus } from 'react-icons/fa'
import { RotatingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { MdDeleteForever } from 'react-icons/md';

function SocialServices() {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center p-2'>
      <button className='flex items-center gap-1 font-bold bg-red-300 rounded-md px-2 py-1'
        onClick={() => navigate('/add-service')}
      >
        Add सामाजिक सेवाएँ <FaPlus />
      </button>
      <ListServices />
    </div>
  )
}

function ListServices() {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const serviceTypes = [
    ["समाज भवन", 'hall'],
    ["समाज छात्रावास", 'hostel'],
    ["एम्बूलैस सेवा", 'ambulance'],
    ["समाज के मदिर", 'mandir']
  ]

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/get-all-gs-social-services-name`);
      const result = await res.json();
      if (res.status === 200) {
        console.log('Fetched services:', result)
        setServices(result);
        setFilteredServices(result);
      } else {
        alert(result.msg);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredServices(services);
    } else {
      setFilteredServices(services.filter(service => service.type === filter));
    }
  }, [filter, services]);

  const navigate = useNavigate();

  const deleteService = async (id, name) => {
    try {
      setLoading(true);
      const confirm = window.confirm('Are you sure you want to delete ' + name + ' ?');
      if (confirm) {
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/delete-service`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id })
        });
        const result = await res.json();
        if (res.status === 200) {
          setServices(services.filter(service => service._id !== id));
        } else {
          alert(result.msg);
        }
      }
    } catch (error) {
      console.error('Error deleting service:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading ? <RotatingLines height="30" width="30" strokeColor="black" /> :
        <div className='text-lg'>
          <p className='w-[100vw] text-center py-2 font-semibold text-xl'>
            Total Services - {services.length}
          </p>
          <div className='flex justify-center mb-4'>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className='border rounded p-1'
            >
              <option value="all">All Types</option>
              {serviceTypes.map(([label, value]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
          <div className='flex flex-col'>
            {filteredServices.map((service, index) => (
              <div className='border p-2 '>
                <p className='w-full text-xs px-8'>{serviceTypes.find(([, value]) => value === service.type)?.[0]}</p>
                <div key={service._id} className='flex justify-around px-2 w-[100vw] gap-1 md:px-14'>
                  <p className='font-bold pr-3 flex'>{index + 1}</p>
                  <h2 className='w-full font-semibold'>{service.name}</h2>
                  <FaEdit color='green' className='cursor-pointer' size={30} onClick={() => navigate('/edit-service/' + service._id)} />
                  <MdDeleteForever color='red' size={30} className='cursor-pointer'
                    onClick={() => deleteService(service._id, service.name)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>}
    </>
  );
}

export default SocialServices;