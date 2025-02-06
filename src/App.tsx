import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import CreateStory from "./pages/CreateStory"
import StoryDetail from "./pages/StoryDetail"
import { AuthProvider } from "./context/AuthContext"

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/create-story" component={CreateStory} />
            <Route path="/story/:id" component={StoryDetail} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App

