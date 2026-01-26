import React, { useState, useEffect } from 'react'

function Dashboard() {
  const [marketData, setMarketData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await fetch('/api/v1/market-data')
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const result = await response.json()
        setMarketData(result.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMarketData()
  }, [])

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <main className="app-main">
      <div className="app-content-header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6">
              <h3 className="mb-0">Dashboard</h3>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-end">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active" aria-current="page">Dashboard v3</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="app-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="card mb-4">
                <div className="card-header border-0">
                  <h3 className="card-title">Market Data</h3>
                </div>
                <div className="card-body table-responsive p-0">
                  <table className="table table-striped align-middle">
                    <thead>
                      <tr>
                        <th>Emiten</th>
                        <th>Date</th>
                        <th>Open Price</th>
                        <th>Close Price</th>
                        <th>High Price</th>
                        <th>Low Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="6" className="text-center p-4">Loading data...</td>
                        </tr>
                      ) : error ? (
                        <tr>
                          <td colSpan="6" className="text-center p-4 text-danger">Error: {error}</td>
                        </tr>
                      ) : marketData.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="text-center p-4">No data available</td>
                        </tr>
                      ) : (
                        marketData.map((item) => (
                          <tr key={item.id}>
                            <td>{item.emiten}</td>
                            <td>{formatDate(item.date)}</td>
                            <td>{formatCurrency(item.open_price)}</td>
                            <td>{formatCurrency(item.close_price)}</td>
                            <td>{formatCurrency(item.high_price)}</td>
                            <td>{formatCurrency(item.low_price)}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Dashboard
