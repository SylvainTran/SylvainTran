class HomePage extends React.Component {
  
    constructor(props) {
      super(props);
      this.state = {selectedPortfolioCriteria: [], submittedInterest: false, interested: null};
      this.updatePortfolioSelectionCriteria = this.updatePortfolioSelectionCriteria.bind(this);

      // Setup initial portfolio display items
      this.getAllPortfolioItems = this.getAllPortfolioItems.bind(this);
    }

    getAllPortfolioItems() {
      // TODO: READ FROM JSON
      return PortfolioItemsData;
    }

    deselectPortfolioItemCriteria(index) {

      // Case where array len === 1
      if (this.state.selectedPortfolioCriteria.length === 1) {
        this.setState({selectedPortfolioCriteria: []});
        return;
      }
      // Cases greater than 1
      // Remove head case
      if (index === 0) {
        let startAtOne = this.state.selectedPortfolioCriteria.slice(1);
        this.setState({selectedPortfolioCriteria: startAtOne});
        return;
      }

      let deselected;
      let beforeIndex = this.state.selectedPortfolioCriteria.slice(0, index);
      let afterIndex = this.state.selectedPortfolioCriteria.slice(index + 1);

      if (afterIndex.length === 0) {
        // Tail case
        deselected = beforeIndex;
      }
      else if (afterIndex.length > 0) {
        // general case
        deselected = beforeIndex.concat(afterIndex);
      }
      this.setState({
        selectedPortfolioCriteria: deselected
      });
    }

    shouldDisplay() {
      // Should Display or not
      const portfolioItems = this.getAllPortfolioItems();
      let selectIndex = -1;

      for(let i=0; i < portfolioItems.length; i++) {
        for(let j=0; j < portfolioItems[i].tags.length; j++) {
          if (portfolioItems[i].tags[j] === criteriaString) {
            selectIndex = [];
            break;
          }
        }
      }
    }

    updatePortfolioSelectionCriteria(criteriaString) {

      for(let i=0; i < this.state.selectedPortfolioCriteria.length; i++) {
        if (this.state.selectedPortfolioCriteria[i] === criteriaString) {
          // deselect
          this.deselectPortfolioItemCriteria(i);
          return;
        }
      }

      // We want to add a new criteria to our array of criterias, that's it
      // Add to selection array
      let curr = this.state.selectedPortfolioCriteria.slice();
      curr.push(criteriaString);
      this.setState({selectedPortfolioCriteria: curr});
    }

    handleSubmittedInterest(interest) {
      this.setState({interested: interest});
    }

    submitInterest() {
      if (this.state.interest != null) {
        console.log("Submitted interest: " + this.state.interested);
        this.setState({submittedInterest: true})
      }
    }

    render() {
      let selectedPortfolioCriteria = this.state.selectedPortfolioCriteria;
      let allPortfolioItems = this.getAllPortfolioItems();
      let selectedPortfolioItems = [];

      // We're just triyng to refresh the array of selected portfolio items
      // Those that have any of the current tags are good to go
      selectedPortfolioCriteria.forEach( criteria => { // All

        allPortfolioItems.forEach( portfolioItemObject => {

          if (portfolioItemObject.tags.includes(criteria)) {
            selectedPortfolioItems.push(portfolioItemObject);
          }
        });
      });

      return (
        <div className="global-container">

        <section className="is-flex">
            <PresentationHeader />
            <div className="flex-start-end">
                <ProfileBusinessCard />
            </div>
        </section>

          <div className="">

              <nav className="uk-navbar">
                  <ul className="uk-navbar-nav uk-hidden-small">
                      <li className="uk-active">
                          <a href="index.html">Portfolio</a>
                      </li>
                      <li>
                          <a href="SylvainTran.pdf">CV</a>
                      </li>
                  </ul>
              </nav>
              
          </div>  

          <div>
              {/* Selection work that have the criterias as tag */}
              <PortfolioNavbar updatePortfolioSelectionCriteria={this.updatePortfolioSelectionCriteria} />

              {/* Gallery of all selected portfolio items */}
              {selectedPortfolioItems.length > 0 ?
              <PortfolioSection selectedPortfolioItems={selectedPortfolioItems} /> : null}
          </div>
      </div>);        
      }
    }