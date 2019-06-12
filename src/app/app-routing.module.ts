import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SplashComponent } from './pages/splash/splash.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DeckComponent } from './pages/deck/deck.component';
import { AddCardComponent } from './pages/add-card/add-card.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { ConversationsComponent } from './pages/conversations/conversations.component';
import { ForumsComponent } from './pages/forums/forums.component';
import { ForumTopicComponent } from './pages/forum-topic/forum-topic.component';
import { ForumPostComponent } from './pages/forum-post/forum-post.component';
const routes: Routes = [
  { path: '', component: SplashComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile/:user_id', component: ProfileComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'decks', component: DeckComponent },
  { path: 'add-card', component: AddCardComponent },
  { path: 'messages', component: ConversationsComponent },
  { path: 'messages/:id', component: MessagesComponent },
  { path: 'forums', component: ForumsComponent },
  { path: 'forums/:id', component: ForumTopicComponent },
  { path: 'forums/posts/:post_id', component: ForumPostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
