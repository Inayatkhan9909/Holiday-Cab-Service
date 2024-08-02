import React from 'react'

const PackageDetails = ({params}) => {
  return (
    <div>
       <h1>PackageDetails</h1>
       <p>your query is : {params.packageid}</p>

    </div>
  )
}

export default PackageDetails