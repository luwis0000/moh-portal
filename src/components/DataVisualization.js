import React, { useState, useEffect } from 'react';
import { useAppContext } from "../utils/AppContext";
import languagePack from "../utils/language";

export default function DataVisualization() {
  const { language } = useAppContext();
  const t = language === "en" ? languagePack.EN : languagePack.TN;

  // Sample health data with proper labels
  const [healthData, setHealthData] = useState({
    diseaseTrends: [
      { month: 'Jan', malaria: 120, tuberculosis: 80, hiv: 150, diabetes: 200 },
      { month: 'Feb', malaria: 90, tuberculosis: 70, hiv: 140, diabetes: 180 },
      { month: 'Mar', malaria: 110, tuberculosis: 85, hiv: 160, diabetes: 220 },
      { month: 'Apr', malaria: 95, tuberculosis: 75, hiv: 145, diabetes: 190 },
      { month: 'May', malaria: 130, tuberculosis: 90, hiv: 170, diabetes: 240 },
      { month: 'Jun', malaria: 100, tuberculosis: 80, hiv: 155, diabetes: 210 }
    ],
    vaccinationRates: [
      { vaccine: 'COVID-19', rate: 85 },
      { vaccine: 'Influenza', rate: 65 },
      { vaccine: 'Measles', rate: 92 },
      { vaccine: 'Polio', rate: 95 },
      { vaccine: 'Hepatitis B', rate: 78 }
    ],
    facilityStats: [
      { type: 'Hospitals', count: 45, capacity: 92 },
      { type: 'Clinics', count: 230, capacity: 88 },
      { type: 'Health Posts', count: 450, capacity: 95 },
      { type: 'Mobile Units', count: 35, capacity: 75 }
    ],
    regionalData: [
      { region: 'Gaborone', facilities: 85, population: 230000, doctors: 450 },
      { region: 'Francistown', facilities: 45, population: 98000, doctors: 180 },
      { region: 'Maun', facilities: 28, population: 55000, doctors: 95 },
      { region: 'Serowe', facilities: 32, population: 45000, doctors: 110 },
      { region: 'Kanye', facilities: 25, population: 38000, doctors: 85 }
    ]
  });

  const [selectedChart, setSelectedChart] = useState('disease');
  const [timeRange, setTimeRange] = useState('6months');

  // Disease labels for better readability
  const diseaseLabels = {
    malaria: language === 'en' ? 'Malaria' : 'Malaria',
    tuberculosis: language === 'en' ? 'Tuberculosis' : 'Tuberculosis',
    hiv: language === 'en' ? 'HIV' : 'HIV',
    diabetes: language === 'en' ? 'Diabetes' : 'Diabetes'
  };

  // Simple bar chart component with better labels
  const BarChart = ({ data, keys, colors, labels }) => {
    const maxValue = Math.max(...data.flatMap(d => keys.map(key => d[key])));
    
    return (
      <div className="bar-chart">
        <div className="bars-container">
          {data.map((item, index) => (
            <div key={index} className="bar-group">
              <div className="bar-label">{item.month}</div>
              <div className="bars">
                {keys.map((key, keyIndex) => (
                  <div
                    key={key}
                    className="bar"
                    style={{
                      height: `${(item[key] / maxValue) * 100}%`,
                      backgroundColor: colors[keyIndex],
                      width: `${85 / keys.length}%`
                    }}
                    title={`${labels[key]}: ${item[key]}`}
                  >
                    <span className="bar-value">{item[key]}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Pie chart component
  const PieChart = ({ data }) => {
    const total = data.reduce((sum, item) => sum + item.rate, 0);
    let currentAngle = 0;

    return (
      <div className="pie-chart">
        <svg width="200" height="200" viewBox="0 0 200 200">
          {data.map((item, index) => {
            const percentage = (item.rate / total) * 100;
            const angle = (percentage / 100) * 360;
            const largeArc = angle > 180 ? 1 : 0;
            
            const x1 = 100 + 80 * Math.cos(currentAngle * Math.PI / 180);
            const y1 = 100 + 80 * Math.sin(currentAngle * Math.PI / 180);
            
            currentAngle += angle;
            
            const x2 = 100 + 80 * Math.cos(currentAngle * Math.PI / 180);
            const y2 = 100 + 80 * Math.sin(currentAngle * Math.PI / 180);

            const pathData = [
              `M 100 100`,
              `L ${x1} ${y1}`,
              `A 80 80 0 ${largeArc} 1 ${x2} ${y2}`,
              `Z`
            ].join(' ');

            return (
              <path
                key={item.vaccine}
                d={pathData}
                fill={`hsl(${index * 60}, 70%, 60%)`}
                className="pie-slice"
              />
            );
          })}
          <circle cx="100" cy="100" r="50" fill="var(--card)" />
        </svg>
        <div className="pie-legend">
          {data.map((item, index) => (
            <div key={item.vaccine} className="legend-item">
              <div 
                className="legend-color" 
                style={{backgroundColor: `hsl(${index * 60}, 70%, 60%)`}}
              ></div>
              <span className="legend-text">{item.vaccine}</span>
              <span className="legend-percentage">{item.rate}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Line chart component
  const LineChart = ({ data, keys, colors, labels }) => {
    const maxValue = Math.max(...data.flatMap(d => keys.map(key => d[key])));
    const points = keys.map(key => 
      data.map((item, index) => {
        const x = (index / (data.length - 1)) * 100;
        const y = 100 - (item[key] / maxValue) * 100;
        return `${x},${y}`;
      }).join(' ')
    );

    return (
      <div className="line-chart">
        <svg width="100%" height="200" viewBox="0 0 100 100">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map(y => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="100"
              y2={y}
              stroke="var(--border-color)"
              strokeWidth="0.5"
            />
          ))}
          
          {/* Data lines */}
          {points.map((pointsString, index) => (
            <polyline
              key={keys[index]}
              points={pointsString}
              fill="none"
              stroke={colors[index]}
              strokeWidth="2"
            />
          ))}
          
          {/* Data points */}
          {keys.map((key, keyIndex) =>
            data.map((item, index) => {
              const x = (index / (data.length - 1)) * 100;
              const y = 100 - (item[key] / maxValue) * 100;
              return (
                <circle
                  key={`${key}-${index}`}
                  cx={x}
                  cy={y}
                  r="1.5"
                  fill={colors[keyIndex]}
                />
              );
            })
          )}
        </svg>
        <div className="line-legend">
          {keys.map((key, index) => (
            <div key={key} className="legend-item">
              <div 
                className="legend-line" 
                style={{backgroundColor: colors[index]}}
              ></div>
              <span className="legend-text">{labels[key]}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="data-visualization">
      <div className="viz-header">
        <h2>{language === 'en' ? 'Health Data Analytics' : 'Dianalitiki tsa Datha ya Bophelo'}</h2>
        <div className="viz-controls">
          <select 
            value={selectedChart} 
            onChange={(e) => setSelectedChart(e.target.value)}
            className="chart-select"
          >
            <option value="disease">{language === 'en' ? 'Disease Trends' : 'Ditlwaelo tsa Malwetse'}</option>
            <option value="vaccination">{language === 'en' ? 'Vaccination Rates' : 'Ditekanyetso tsa go Laya'}</option>
            <option value="facilities">{language === 'en' ? 'Facility Capacity' : 'Bokgoni jwa Dibaka'}</option>
            <option value="regional">{language === 'en' ? 'Regional Data' : 'Datha ya Dikgaolo'}</option>
          </select>
          
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="time-select"
          >
            <option value="3months">{language === 'en' ? '3 Months' : 'Dikgwedi tše 3'}</option>
            <option value="6months">{language === 'en' ? '6 Months' : 'Dikgwedi tše 6'}</option>
            <option value="1year">{language === 'en' ? '1 Year' : 'Ngwaga o 1'}</option>
          </select>
        </div>
      </div>

      <div className="viz-content">
        {selectedChart === 'disease' && (
          <div className="chart-container">
            <h3>{language === 'en' ? 'Disease Cases (Last 6 Months)' : 'Diketsa tša Malwetse (Dikgwedi tše 6 tše di fetilego)'}</h3>
            <BarChart 
              data={healthData.diseaseTrends}
              keys={['malaria', 'tuberculosis', 'hiv', 'diabetes']}
              colors={['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4']}
              labels={diseaseLabels}
            />
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-color" style={{backgroundColor: '#ff6b6b'}}></div>
                <span className="legend-text">{diseaseLabels.malaria}</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{backgroundColor: '#4ecdc4'}}></div>
                <span className="legend-text">{diseaseLabels.tuberculosis}</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{backgroundColor: '#45b7d1'}}></div>
                <span className="legend-text">{diseaseLabels.hiv}</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{backgroundColor: '#96ceb4'}}></div>
                <span className="legend-text">{diseaseLabels.diabetes}</span>
              </div>
            </div>
          </div>
        )}

        {selectedChart === 'vaccination' && (
          <div className="chart-container">
            <h3>{language === 'en' ? 'Vaccination Coverage Rates' : 'Ditekanyetso tša Pokollo ya go Laya'}</h3>
            <PieChart data={healthData.vaccinationRates} />
          </div>
        )}

        {selectedChart === 'facilities' && (
          <div className="chart-container">
            <h3>{language === 'en' ? 'Healthcare Facility Capacity' : 'Bokgoni jwa Dibaka tša Tlhokomelo ya Bophelo'}</h3>
            <div className="facility-stats">
              {healthData.facilityStats.map((facility, index) => (
                <div key={facility.type} className="facility-item">
                  <div className="facility-type">{facility.type}</div>
                  <div className="facility-count">{facility.count} {language === 'en' ? 'facilities' : 'dibaka'}</div>
                  <div className="capacity-bar">
                    <div 
                      className="capacity-fill"
                      style={{width: `${facility.capacity}%`}}
                    ></div>
                    <span className="capacity-text">{facility.capacity}% {language === 'en' ? 'capacity' : 'bokgoni'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedChart === 'regional' && (
          <div className="chart-container">
            <h3>{language === 'en' ? 'Regional Health Statistics' : 'Dipalopalo tša Bophelo tša Dikgaolo'}</h3>
            <LineChart 
              data={healthData.regionalData}
              keys={['facilities', 'doctors']}
              colors={['#ff6b6b', '#4ecdc4']}
              labels={{
                facilities: language === 'en' ? 'Facilities' : 'Dibaka',
                doctors: language === 'en' ? 'Doctors' : 'Dingaka'
              }}
            />
            <div className="regional-table">
              <table>
                <thead>
                  <tr>
                    <th>{language === 'en' ? 'Region' : 'Kgaolo'}</th>
                    <th>{language === 'en' ? 'Facilities' : 'Dibaka'}</th>
                    <th>{language === 'en' ? 'Population' : 'Baagi'}</th>
                    <th>{language === 'en' ? 'Doctors' : 'Dingaka'}</th>
                  </tr>
                </thead>
                <tbody>
                  {healthData.regionalData.map((region, index) => (
                    <tr key={region.region}>
                      <td>{region.region}</td>
                      <td>{region.facilities}</td>
                      <td>{region.population.toLocaleString()}</td>
                      <td>{region.doctors}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}