import { providerService } from '@/app/services/providerService'
import React from 'react'

const Dashboard = async () => {

    const providerProfile = await providerService.getProviderProfile();
 console.log(providerProfile);
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard