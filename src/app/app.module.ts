import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { ActivatedRoute } from '@angular/router';
import { NavBrowserComponent } from './components/nav-browser/nav-browser.component';
import { NavMobileComponent } from './components/nav-mobile/nav-mobile.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { SplashComponent } from './pages/splash/splash.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { DeckComponent } from './pages/deck/deck.component';
import { FlashcardComponent } from './pages/flashcard/flashcard.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { AddCardComponent } from './pages/add-card/add-card.component';
import { ForumsComponent } from './pages/forums/forums.component';

import { ImageCaptureComponent } from './pages/image-capture/image-capture.component';
import { NoPictureComponent } from './pages/no-picture-card/no-picture-card.component';
import { ConfirmCompletedCardComponent } from './pages/confirm-completed-card/confirm-completed-card.component';
import { UserSettingsComponent } from './pages/user-settings/user-settings.component';
import { EditCardComponent } from './pages/edit-card/edit-card.component';
import { FooterComponent } from './components/footer/footer.component';
import { ConversationsComponent } from './pages/conversations/conversations.component';
import { ForumTopicComponent } from './pages/forum-topic/forum-topic.component';
import { ForumPostComponent } from './pages/forum-post/forum-post.component';
import { NewForumPostComponent } from './pages/new-forum-post/new-forum-post.component';
import { AddCardNoImageComponent } from './pages/add-card-no-image/add-card-no-image.component';
import { AddCardImageUploadComponent } from './add-card-image-upload/add-card-image-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBrowserComponent,
    NavMobileComponent,
    HeaderComponent,
    HomeComponent,
    SplashComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ContactsComponent,
    DeckComponent,
    FlashcardComponent,
    MessagesComponent,
    AddCardComponent,
    ForumsComponent,
    ImageCaptureComponent,
    NoPictureComponent,
    ConfirmCompletedCardComponent,
    UserSettingsComponent,
    EditCardComponent,
    FooterComponent,
    ConversationsComponent,
    ForumTopicComponent,
    ForumPostComponent,
    NewForumPostComponent,
    AddCardNoImageComponent,
    AddCardImageUploadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
