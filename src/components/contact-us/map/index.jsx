const Map = ()=>{
  return (
    <div className="md:py-16 md:px-[10%] md:h-[600px] h-[240]">
        <iframe 
            className="hidden md:block"
            width="100%" 
            height="430" 
            frameborder="0" 
            marginheight="0" 
            marginwidth="0" 
            src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=wap%20institute+(Wap%20Institute)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        />

        <iframe 
            className="md:hidden block"
            width="100%" 
            height="240" 
            frameborder="0" 
            marginheight="0" 
            marginwidth="0" 
            src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=wap%20institute+(Wap%20Institute)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        />
    </div>
  );
}

export default Map;