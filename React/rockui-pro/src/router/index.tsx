
import React from 'react'
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { asyncComponent } from '../components/LazyComponent/index'

const Layout = asyncComponent(() => import(/* webpackChunkName: 'Layout' */ '../components/Layout'));
const Home = asyncComponent(() => import(/* webpackChunkName: 'Home' */ '../page/home'));
const Uidoc = asyncComponent(() => import(/* webpackChunkName: 'Uidoc' */ '../page/uidoc'));
const Index = asyncComponent(() => import(/* webpackChunkName: 'Index' */ '../page/index'));
const Recipe = asyncComponent(() => import(/* webpackChunkName: 'Recipe' */ '../page/recipe/manager-list'));
const EditRecipe = asyncComponent(() => import(/* webpackChunkName: 'EditRecipe' */ '../page/recipe/edit-recipe'));
const Function = asyncComponent(() => import(/* webpackChunkName: 'Function' */ '../page/function'));
const Resume = asyncComponent(() => import(/* webpackChunkName: 'Resume' */ '../page/resume'));
const ResumePreview = asyncComponent(() => import(/* webpackChunkName: 'ResumePreview' */ '../page/resume/preview'));

// import Layout from '../components/Layout'
// import Home from '../page/home';
// import Uidoc from '../page/uidoc';
// import Index from '../page/index';
// import Recipe from '../page/recipe/manager-list';
// import EditRecipe from '../page/recipe/edit-recipe';
// import Function from '../page/function';
// import Resume from '../page/resume';
// import ResumePreview from '../page/resume/preview';


interface Props { }
const HRouter: React.FC<Props> = (props) => {
  return (
    <Router>
      <Layout>
        <Route path="/" pathName="index" name="index" exact component={Index}></Route>
        <Route path="/home" component={Home}></Route>
        <Route path="/uidoc" component={Uidoc}></Route>
        <Route path="/recipe" component={Recipe}></Route>
        <Route path="/editRecipe" component={EditRecipe}></Route>
        <Route path="/function" component={Function}></Route>
        <Route path="/resume" exact component={Resume}></Route>
        <Route path="/resume/preview" component={ResumePreview}></Route>
      </Layout>
    </Router>
  )
}

export default HRouter;