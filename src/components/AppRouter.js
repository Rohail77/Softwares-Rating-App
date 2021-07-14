import { Route, Switch } from 'react-router-dom';
import EditReviewsPage from './edit reviews/EditReviewsPage';
import SigninContextConsumer from './gateway/sign in/SigninContextConsumer';
import SignupContextConsumer from './gateway/sign up/SignupContextConsumer';
import MainPageLogic from './main/page/MainPageLogic';
import NotFound from './not found page/NotFound';
import SoftwareDetailsRouterLogic from './software details/router/SoftwareDetailsRouterLogic';

function AppRouter(props) {
  function getSoftware(id) {
    const { softwares } = props;
    return softwares.find(software => software.id === id);
  }

  return (
    <Switch>
      <Route
        path='/'
        exact
        render={() => {
          return <MainPageLogic {...props} />;
        }}
      />
      <Route
        path='/edit_reviews'
        exact
        render={() => {
          return <EditReviewsPage />;
        }}
      />

      <Route
        path='/signup'
        exact
        render={props => {
          const { from } = props.location.state;
          return <SignupContextConsumer from={from} />;
        }}
      />

      <Route
        path='/signin'
        exact
        render={props => {
          const { from } = props.location.state;
          return <SigninContextConsumer from={from} />;
        }}
      />

      <Route
        path='/software_details/:id'
        render={props => {
          const { id } = props.match.params;
          const software = getSoftware(id);
          return software ? (
            <SoftwareDetailsRouterLogic
              software={software}
            />
          ) : (
            <NotFound />
          );
        }}
      />

      <Route component={NotFound} />
    </Switch>
  );
}

export default AppRouter;
