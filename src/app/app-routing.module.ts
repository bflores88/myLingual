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
import { NewForumPostComponent } from './pages/new-forum-post/new-forum-post.component';
import { AddCardNoImageComponent } from './pages/add-card-no-image/add-card-no-image.component';
import { ImageCaptureComponent } from './pages/image-capture/image-capture.component';
import { TestComponent } from './pages/test/test.component';
import { UserSettingsComponent } from './pages/user-settings/user-settings.component';
import { DeckDetailComponent } from './pages/deck-detail/deck-detail.component';
import { AddCardUploadComponent } from './pages/add-card-upload/add-card-upload.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { CardComponent } from './pages/card/card.component';
import { InvitesComponent } from './pages/invites/invites.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { AuthGuard } from './guards/auth-guard.service';
import { AboutComponent } from './pages/about/about.component';


const routes: Routes = [
  { path: '', component: SplashComponent },
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile/:user_id', canActivate: [AuthGuard], component: ProfileComponent },
  { path: 'profile', canActivate: [AuthGuard], component: ProfileComponent },
  { path: 'contacts', canActivate: [AuthGuard], component: ContactsComponent },
  { path: 'invites', canActivate: [AuthGuard], component: InvitesComponent },
  { path: 'settings', canActivate: [AuthGuard], component: UserSettingsComponent },
  { path: 'decks', canActivate: [AuthGuard], component: DeckComponent },
  { path: 'decks/:id', canActivate: [AuthGuard],  component: DeckDetailComponent },
  { path: 'card/:id', component: CardComponent },
  { path: 'test/:id', canActivate: [AuthGuard], component: TestComponent },
  { path: 'about', canActivate: [AuthGuard], component: AboutComponent },
  { path: 'add-card', canActivate: [AuthGuard], component: AddCardComponent },
  { path: 'add-card/continue', canActivate: [AuthGuard], component: AddCardNoImageComponent },
  { path: 'add-card/upload', canActivate: [AuthGuard], component: AddCardUploadComponent },
  { path: 'add-card/capture', canActivate: [AuthGuard], component: ImageCaptureComponent },
  { path: 'messages', canActivate: [AuthGuard], component: ConversationsComponent },
  { path: 'messages/:id', canActivate: [AuthGuard], component: MessagesComponent },
  { path: 'forums', canActivate: [AuthGuard], component: ForumsComponent },
  { path: 'forums/:id', canActivate: [AuthGuard], component: ForumTopicComponent },
  { path: 'forums/new/:id', canActivate: [AuthGuard], component: NewForumPostComponent },
  { path: 'forums/posts/:post_id', canActivate: [AuthGuard], component: ForumPostComponent },
  { path: 'search/:search_text', canActivate: [AuthGuard], component: SearchResultsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
