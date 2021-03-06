const Scroll = {
    scrollToElement: function(elemId){
        const elem = document.querySelector(`#${elemId}`);
        elem.scrollIntoView();
    },
    setActive: function(closestTitleId){
        const previousActiveTitle = document.querySelector(".active.item");
        previousActiveTitle.classList.remove('active');
        const nextActiveTitle = document.querySelector(`#${closestTitleId}-link`);
        nextActiveTitle.classList.add('active');
    },
    setScrollListener: function (){
        const sections = Array.from(document.getElementsByClassName("ss-section"))
        const sectionsWithPositions = sections.map( (x) => { 
            return { 
                elementId: x.id,
                position: x.getBoundingClientRect().top
            }}
        );
        let isScrolling;
        window.addEventListener('scroll', function() {
            // helped the idea of bouncing instead of reacting immediately
            // https://gomakethings.com/detecting-when-a-visitor-has-stopped-scrolling-with-vanilla-javascript/
            window.clearTimeout( isScrolling );
            isScrolling = setTimeout(function() {
                let yDifference = 0;
                let closestTitleId = "intro-container";
                const currentY = document.documentElement.scrollTop;
                sectionsWithPositions.forEach(section => {
                    if(section.position - currentY + 10 < yDifference){
                        yDifference = currentY - section.position;
                        closestTitleId = section.elementId
                    }
                })
                Scroll.setActive(closestTitleId)
            }, 100);
            
        });
    }
}
