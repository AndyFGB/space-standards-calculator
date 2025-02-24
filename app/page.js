import SpaceStandardsCalculator from '../components/SpaceStandardsCalculator'

export default function Home() {
  return (
    <main>
      <div style={{ 
        position: 'fixed', 
        top: '10px', 
        right: '10px', 
        zIndex: 9999 
      }}>
        <a 
          href="#" 
          onClick={() => {
            document.body.classList.toggle('dark-mode');
            return false;
          }}
          style={{
            padding: '10px 20px',
            backgroundColor: 'blue',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
            fontWeight: 'bold'
          }}
        >
          Toggle Dark Mode
        </a>
      </div>
      <SpaceStandardsCalculator />
    </main>
  )
}