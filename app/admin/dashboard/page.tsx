// AdminDashboardPage.tsx
"use client";

import React, { useState, FormEvent, ChangeEvent, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  PlusCircle, Film, Type, FileText, Youtube, Clock, Hash, Image as ImageIcon,
  AlertCircle, CheckCircle, DollarSign, BookOpen, Video, Book, FileUp, Paperclip,
  Leaf, Edit3, Trash2, ListChecks, Edit, Loader2, X, SlidersHorizontal, CalendarDays, Link as LinkIcon
} from 'lucide-react';
import NextImage from 'next/image';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';

// --- INTERFACES ---
interface PodcastSeriesFormData { _id?: string; title: string; description: string; category?: string; author?: string; coverImage?: string; /* URL */ }
interface PodcastEpisodeFormData { _id?: string; podcastSeries: string; title: string; description: string; youtubeLink: string; duration: string; episodeNumber: string; publishDate?: string; thumbnail?: string; /* URL */ }
interface ProgramFormData { _id?: string; title: string; description: string; price: string; duration: string; youtubeLink: string; thumbnail?: string; }
interface EbookFormData { _id?: string; title: string; description: string; price: string; pages: string; category: string; thumbnail?: string; pdfFile?: string; razorpayPaymentLink?: string; }
interface NutritionPlanFormData { _id?: string; title: string; description: string; price: string; pages?: string; category: string; thumbnail?: string; pdfFile?: string; razorpayPaymentLink?: string; }
interface BlogFormData { _id?: string; title: string; content: string; excerpt: string; categories: string; author?: string; isFeatured: boolean; status: 'draft' | 'published'; metaTitle?: string; metaDescription?: string; readingTime?: string; coverImage?: string; }

interface ListItem { _id: string; title: string; }
interface PodcastSeriesListItem extends ListItem { coverImageUrl?: string; description?: string; }
interface PodcastEpisodeListItem extends ListItem { thumbnailUrl?: string; episodeNumber?: string; youtubeLink?: string; }
interface ProgramListItem extends ListItem { thumbnail?: { url: string }; price?: string; duration?: string; }
interface EbookListItem extends ListItem { thumbnail?: { url: string }; category?: string; price?: string; pages?: string; razorpayPaymentLink?: string; }
interface NutritionPlanListItem extends ListItem { thumbnail?: { url: string }; category?: string; price?: string; pages?: string; razorpayPaymentLink?: string; }
interface BlogPostForList { _id: string; title: string; slug: string; categories: string[]; status: 'draft' | 'published'; isFeatured: boolean; createdAt: string; updatedAt: string; coverImage?: { url: string }; author?: string; }
interface BlogPost extends BlogPostForList { content: string; excerpt: string; metaTitle?: string; metaDescription?: string; readingTime?: string; }

type AllListItems = PodcastSeriesListItem | ProgramListItem | EbookListItem | NutritionPlanListItem | BlogPostForList;

// --- CONSTANTS ---
const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api` || "http://localhost:5001/api";
const INPUT_CLASS = "mt-1 block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm";
const TEXTAREA_CLASS_NAME = "mt-1 block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm min-h-[100px]";
const LABEL_CLASS = "block text-sm font-medium text-gray-700 mb-1";
const ICON_CLASS = "h-5 w-5 text-gray-400";
const FILE_INPUT_STYLING = "block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100 pl-10 pr-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500";
const TAB_BUTTON_BASE = "px-4 sm:px-6 py-3 text-xs sm:text-sm font-medium rounded-md transition-colors duration-150 focus:outline-none flex items-center justify-center";
const ACTIVE_TAB_BUTTON = `${TAB_BUTTON_BASE} bg-pink-600 text-white shadow-md`;
const INACTIVE_TAB_BUTTON = `${TAB_BUTTON_BASE} bg-gray-200 text-gray-700 hover:bg-gray-300`;
const SUBMIT_BUTTON_CLASS = "w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:bg-pink-300";

const getFullImageUrl = (relativePathFromServer?: string): string | undefined => { // Return string | undefined
  if (!relativePathFromServer) return undefined; // Return undefined instead of null
  if (relativePathFromServer.startsWith('http') || relativePathFromServer.startsWith('blob:')) {
    return relativePathFromServer;
  }
  try {
    let backendUrlStr = `${process.env.NEXT_PUBLIC_API_URL}/api` || "http://localhost:5001/api";
    const urlObject = new URL(backendUrlStr);
    let backendRoot = `${urlObject.protocol}//${urlObject.host}`;
    const path = relativePathFromServer.startsWith('/') ? relativePathFromServer : `/${relativePathFromServer}`;
    return `${backendRoot}${path}`;
  } catch (e) {
    console.error("Error constructing full image URL with NEXT_PUBLIC_API_URL. Ensure it's a valid full URL (e.g., http://localhost:5001/api). Error:", e);
    const fallbackRoot = (`${process.env.NEXT_PUBLIC_API_URL}/api` || "http://localhost:5001/api").replace(/\/api$/, "");
    const path = relativePathFromServer.startsWith('/') ? relativePathFromServer : `/${relativePathFromServer}`;
    return `${fallbackRoot}${path}`;
  }
};


export default function AdminDashboardPage() {
  const [activeSection, setActiveSection] = useState<'podcastSeries' | 'program' | 'ebook' | 'nutrition' | 'blog'>('podcastSeries');

  const [podcastSeriesFormData, setPodcastSeriesFormData] = useState<PodcastSeriesFormData>({ title: '', description: '', category: '', author: '', coverImage: undefined });
  const [podcastEpisodeFormData, setPodcastEpisodeFormData] = useState<PodcastEpisodeFormData>({ podcastSeries: '', title: '', description: '', youtubeLink: '', duration: '', episodeNumber: '', publishDate: new Date().toISOString().split('T')[0], thumbnail: undefined });
  const [programFormData, setProgramFormData] = useState<ProgramFormData>({ title: '', description: '', price: '', duration: '', youtubeLink: '', thumbnail: undefined });
  const [ebookFormData, setEbookFormData] = useState<EbookFormData>({ title: '', description: '', price: '', pages: '', category: '', thumbnail: undefined, pdfFile: undefined, razorpayPaymentLink: '' });
  const [nutritionPlanFormData, setNutritionPlanFormData] = useState<NutritionPlanFormData>({ title: '', description: '', price: '', pages: '', category: '', thumbnail: undefined, pdfFile: undefined, razorpayPaymentLink: '' });
  const [blogFormData, setBlogFormData] = useState<BlogFormData>({ _id: undefined, title: '', content: '', excerpt: '', categories: '', author: 'Dr. Yogita Physiotherapy', isFeatured: false, status: 'draft', metaTitle: '', metaDescription: '', readingTime: '', coverImage: undefined });

  const [isEditingPodcastSeries, setIsEditingPodcastSeries] = useState(false);
  const [isEditingPodcastEpisode, setIsEditingPodcastEpisode] = useState(false);
  const [isEditingProgram, setIsEditingProgram] = useState(false);
  const [isEditingEbook, setIsEditingEbook] = useState(false);
  const [isEditingNutrition, setIsEditingNutrition] = useState(false);
  const [isEditingBlog, setIsEditingBlog] = useState(false);

  const [podcastSeriesCoverFile, setPodcastSeriesCoverFile] = useState<File | null>(null);
  const [podcastEpisodeThumbnailFile, setPodcastEpisodeThumbnailFile] = useState<File | null>(null);
  const [programThumbnailFile, setProgramThumbnailFile] = useState<File | null>(null);
  const [ebookThumbnailFile, setEbookThumbnailFile] = useState<File | null>(null);
  const [ebookPdfFile, setEbookPdfFile] = useState<File | null>(null);
  const [nutritionThumbnailFile, setNutritionThumbnailFile] = useState<File | null>(null);
  const [nutritionPdfFile, setNutritionPdfFile] = useState<File | null>(null);
  const [blogCoverImageFile, setBlogCoverImageFile] = useState<File | null>(null);
  
  const [podcastSeriesCoverPreview, setPodcastSeriesCoverPreview] = useState<string | null>(null);
  const [podcastEpisodeThumbnailPreview, setPodcastEpisodeThumbnailPreview] = useState<string | null>(null);
  const [programThumbnailPreview, setProgramThumbnailPreview] = useState<string | null>(null);
  const [ebookThumbnailPreview, setEbookThumbnailPreview] = useState<string | null>(null);
  const [ebookPdfFileName, setEbookPdfFileName] = useState<string | null>(null);
  const [nutritionThumbnailPreview, setNutritionThumbnailPreview] = useState<string | null>(null);
  const [nutritionPdfFileName, setNutritionPdfFileName] = useState<string | null>(null);
  const [blogCoverImagePreview, setBlogCoverImagePreview] = useState<string | null>(null);

  const [podcastSeriesList, setPodcastSeriesList] = useState<PodcastSeriesListItem[]>([]);
  const [podcastEpisodeList, setPodcastEpisodeList] = useState<PodcastEpisodeListItem[]>([]);
  const [programs, setPrograms] = useState<ProgramListItem[]>([]);
  const [ebooks, setEbooks] = useState<EbookListItem[]>([]);
  const [nutritionPlans, setNutritionPlans] = useState<NutritionPlanListItem[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPostForList[]>([]);
  const [blogCategories, setBlogCategories] = useState<string[]>([]);

  const [isLoadingItems, setIsLoadingItems] = useState(false);
  const [listError, setListError] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [episodeLoading, setEpisodeLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [episodeModalError, setEpisodeModalError] = useState<string | null>(null);
  const [episodeModalSuccess, setEpisodeModalSuccess] = useState<string | null>(null);

  const [isEpisodeModalOpen, setIsEpisodeModalOpen] = useState(false);
  const [currentManagingSeries, setCurrentManagingSeries] = useState<PodcastSeriesListItem | null>(null);

  const podcastSeriesCoverRef = useRef<HTMLInputElement | null>(null);
  const podcastEpisodeThumbnailRef = useRef<HTMLInputElement | null>(null);
  const programThumbnailRef = useRef<HTMLInputElement | null>(null);
  const ebookThumbnailRef = useRef<HTMLInputElement | null>(null);
  const ebookPdfRef = useRef<HTMLInputElement | null>(null);
  const nutritionThumbnailRef = useRef<HTMLInputElement | null>(null);
  const nutritionPdfRef = useRef<HTMLInputElement | null>(null);
  const blogCoverImageRef = useRef<HTMLInputElement | null>(null);

  const currentPreviews = useRef<{ [key: string]: string | null }>({}).current;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, formType?: 'podcastSeries' | 'podcastEpisode') => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    if (formType === 'podcastEpisode') { setEpisodeModalError(null); setEpisodeModalSuccess(null); }
    else { setError(null); setSuccess(null); }

    const updateState = (setter: React.Dispatch<React.SetStateAction<any>>) => {
        setter((prev: any) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    if (formType === 'podcastEpisode') updateState(setPodcastEpisodeFormData);
    else if (activeSection === 'podcastSeries') updateState(setPodcastSeriesFormData);
    else if (activeSection === 'program') updateState(setProgramFormData);
    else if (activeSection === 'ebook') updateState(setEbookFormData);
    else if (activeSection === 'nutrition') updateState(setNutritionPlanFormData);
    else if (activeSection === 'blog') updateState(setBlogFormData);
  };

  const createSpecificFileHandler = (
    fileStateKey: string, setFile: React.Dispatch<React.SetStateAction<File | null>>, 
    setPreviewOrFilename: React.Dispatch<React.SetStateAction<string | null>>, 
    inputRef: React.RefObject<HTMLInputElement | null>, 
    maxSizeMB: number, allowedTypes: string[], fileTypeLabel: string, isFilePdf: boolean = false,
    isEpisodeModalContext: boolean = false
  ) => (e: ChangeEvent<HTMLInputElement>) => {
    if (isEpisodeModalContext) { setEpisodeModalError(null); setEpisodeModalSuccess(null); }
    else { setError(null); setSuccess(null); }

    const oldPreview = currentPreviews[fileStateKey]; 
    if (oldPreview && oldPreview.startsWith('blob:')) { URL.revokeObjectURL(oldPreview); }
    
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const generalErrorSetter = isEpisodeModalContext ? setEpisodeModalError : setError;

      if (file.size > maxSizeMB * 1024 * 1024) { generalErrorSetter(`${fileTypeLabel} size > ${maxSizeMB}MB.`); setFile(null); setPreviewOrFilename(null); currentPreviews[fileStateKey] = null; if (inputRef.current) inputRef.current.value = ""; return; }
      if (!allowedTypes.includes(file.type) && !(isFilePdf && (file.type === 'application/pdf' || (file.type === '' && file.name.toLowerCase().endsWith('.pdf'))))) { generalErrorSetter(`Invalid type for ${fileTypeLabel}. Allowed: ${allowedTypes.join(', ')}`); setFile(null); setPreviewOrFilename(null); currentPreviews[fileStateKey] = null; if (inputRef.current) inputRef.current.value = ""; return; }
      
      setFile(file); 
      if (isFilePdf) {
        setPreviewOrFilename(file.name); 
        currentPreviews[fileStateKey] = file.name; 
      } else {
        const newPreviewUrl = URL.createObjectURL(file);
        setPreviewOrFilename(newPreviewUrl);
        currentPreviews[fileStateKey] = newPreviewUrl;
      }
    } else { 
      setFile(null); 
      if (currentPreviews[fileStateKey]?.startsWith('blob:')) {
        setPreviewOrFilename(null);
      }
      currentPreviews[fileStateKey] = null; 
    }
  };

  const handlePodcastSeriesCoverChange = createSpecificFileHandler("podcastSeriesCover", setPodcastSeriesCoverFile, setPodcastSeriesCoverPreview, podcastSeriesCoverRef, 5, ['image/jpeg', 'image/png', 'image/webp', 'image/gif'], "Series Cover");
  const handlePodcastEpisodeThumbnailChange = createSpecificFileHandler("podcastEpisodeThumb", setPodcastEpisodeThumbnailFile, setPodcastEpisodeThumbnailPreview, podcastEpisodeThumbnailRef, 5, ['image/jpeg', 'image/png', 'image/webp', 'image/gif'], "Episode Thumbnail", false, true);
  const handleProgramThumbnailChange = createSpecificFileHandler("programThumb",setProgramThumbnailFile, setProgramThumbnailPreview, programThumbnailRef, 5, ['image/jpeg', 'image/png', 'image/webp', 'image/gif'], "Program Thumbnail");
  const handleEbookThumbnailChange = createSpecificFileHandler("ebookThumb",setEbookThumbnailFile, setEbookThumbnailPreview, ebookThumbnailRef, 5, ['image/jpeg', 'image/png', 'image/webp', 'image/gif'], "Ebook Thumbnail");
  const handleEbookPdfChange = createSpecificFileHandler("ebookPdf",setEbookPdfFile, setEbookPdfFileName, ebookPdfRef, 20, ['application/pdf'], "Ebook PDF", true);
  const handleNutritionThumbnailChange = createSpecificFileHandler("nutritionThumb",setNutritionThumbnailFile, setNutritionThumbnailPreview, nutritionThumbnailRef, 5, ['image/jpeg', 'image/png', 'image/webp', 'image/gif'], "Nutrition Thumbnail");
  const handleNutritionPdfChange = createSpecificFileHandler("nutritionPdf", setNutritionPdfFile, setNutritionPdfFileName, nutritionPdfRef, 20, ['application/pdf'], "Nutrition PDF", true);
  const handleBlogCoverImageChange = createSpecificFileHandler("blogCover",setBlogCoverImageFile, setBlogCoverImagePreview, blogCoverImageRef, 5, ['image/jpeg', 'image/png', 'image/webp', 'image/gif'], "Blog Cover Image");

  const resetForm = (formType: 'podcastSeries' | 'podcastEpisode' | 'program' | 'ebook' | 'nutrition' | 'blog') => {
    const resetRef = (ref: React.RefObject<HTMLInputElement | null>) => { if (ref.current) ref.current.value = ""; };
    const revokeAndReset = (previewKey: string, setPreviewState: React.Dispatch<React.SetStateAction<string | null>>) => { const oldPreview = currentPreviews[previewKey]; if (oldPreview && oldPreview.startsWith('blob:')) URL.revokeObjectURL(oldPreview); setPreviewState(null); currentPreviews[previewKey] = null; };

    if (formType === 'podcastSeries') { setPodcastSeriesFormData({ title: '', description: '', category: '', author: '', coverImage: undefined }); revokeAndReset("podcastSeriesCover", setPodcastSeriesCoverPreview); setPodcastSeriesCoverFile(null); resetRef(podcastSeriesCoverRef); setIsEditingPodcastSeries(false); }
    else if (formType === 'podcastEpisode') { setPodcastEpisodeFormData({ podcastSeries: currentManagingSeries?._id || '', title: '', description: '', youtubeLink: '', duration: '', episodeNumber: '', publishDate: new Date().toISOString().split('T')[0], thumbnail: undefined }); revokeAndReset("podcastEpisodeThumb", setPodcastEpisodeThumbnailPreview); setPodcastEpisodeThumbnailFile(null); resetRef(podcastEpisodeThumbnailRef); setIsEditingPodcastEpisode(false); }
    else if (formType === 'program') { setProgramFormData({ title: '', description: '', price: '', duration: '', youtubeLink: '', thumbnail: undefined }); revokeAndReset("programThumb", setProgramThumbnailPreview); setProgramThumbnailFile(null); resetRef(programThumbnailRef); setIsEditingProgram(false); }
    else if (formType === 'ebook') { setEbookFormData({ title: '', description: '', price: '', pages: '', category: '', thumbnail: undefined, pdfFile: undefined, razorpayPaymentLink: '' }); revokeAndReset("ebookThumb", setEbookThumbnailPreview); setEbookThumbnailFile(null); setEbookPdfFile(null); revokeAndReset("ebookPdf", setEbookPdfFileName); setEbookPdfFileName(null); resetRef(ebookThumbnailRef); resetRef(ebookPdfRef); setIsEditingEbook(false); }
    else if (formType === 'nutrition') { setNutritionPlanFormData({ title: '', description: '', price: '', pages: '', category: '', thumbnail: undefined, pdfFile: undefined, razorpayPaymentLink: '' }); revokeAndReset("nutritionThumb", setNutritionThumbnailPreview); setNutritionThumbnailFile(null); setNutritionPdfFile(null); revokeAndReset("nutritionPdf", setNutritionPdfFileName); setNutritionPdfFileName(null); resetRef(nutritionThumbnailRef); resetRef(nutritionPdfRef); setIsEditingNutrition(false); }
    else if (formType === 'blog') { setBlogFormData({ _id: undefined, title: '', content: '', excerpt: '', categories: '', author: 'Dr. Yogita Physiotherapy', isFeatured: false, status: 'draft', metaTitle: '', metaDescription: '', readingTime: '', coverImage: undefined }); revokeAndReset("blogCover", setBlogCoverImagePreview); setBlogCoverImageFile(null); resetRef(blogCoverImageRef); setIsEditingBlog(false); }
  };
  
  const handleSubmitApi = async (
    endpoint: string, method: 'POST' | 'PUT', data: FormData, 
    formType: string, successMessage: string, 
    isEpisodeContext: boolean = false // Default value for isEpisodeContext
  ) => {
    const generalErrorSetter = isEpisodeContext ? setEpisodeModalError : setError;
    const generalSuccessSetter = isEpisodeContext ? setEpisodeModalSuccess : setSuccess;
    const generalLoadingSetter = isEpisodeContext ? setEpisodeLoading : setLoading;

    generalErrorSetter(null); generalSuccessSetter(null); generalLoadingSetter(true);
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, { method, body: data });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.error || result.message || `Failed: ${formType}.`);
      
      generalSuccessSetter(successMessage);
      if (formType === 'podcastSeries') { resetForm('podcastSeries'); await fetchPodcastSeries(); }
      else if (formType === 'podcastEpisode' && currentManagingSeries) { resetForm('podcastEpisode'); await fetchPodcastEpisodesForSeries(currentManagingSeries._id); }
      else if (formType === 'program') { resetForm('program'); await fetchItems('programs', setPrograms, '/programs'); }
      else if (formType === 'ebook') { resetForm('ebook'); await fetchItems('ebooks', setEbooks, '/ebooks'); }
      else if (formType === 'nutrition') { resetForm('nutrition'); await fetchItems('nutrition-plans', setNutritionPlans, '/nutrition-plans'); }
      else if (formType === 'blog') { resetForm('blog'); await fetchBlogPosts(); }

    } catch (err: any) { generalErrorSetter(err.message || 'Error occurred.'); }
    finally { generalLoadingSetter(false); setTimeout(() => { generalSuccessSetter(null); generalErrorSetter(null); }, 5000); }
  };

  const handlePodcastSeriesSubmit = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); if (!podcastSeriesFormData.title || (!isEditingPodcastSeries && !podcastSeriesCoverFile)) { setError('Series Title & Cover Image required for new entries.'); return; } const fd = new FormData(); Object.entries(podcastSeriesFormData).forEach(([key, value]) => { if (key === '_id' && !value) return; if (key === 'coverImage' && value === undefined && isEditingPodcastSeries) return; fd.append(key, value || ''); }); if (podcastSeriesCoverFile) fd.append('coverImageFile', podcastSeriesCoverFile); const endpoint = isEditingPodcastSeries && podcastSeriesFormData._id ? `/podcast-series/${podcastSeriesFormData._id}` : '/podcast-series'; const method = isEditingPodcastSeries ? 'PUT' : 'POST'; const message = isEditingPodcastSeries ? 'Podcast Series updated!' : 'Podcast Series added!'; handleSubmitApi(endpoint, method, fd, 'podcastSeries', message); };
  const handlePodcastEpisodeSubmit = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); if (!podcastEpisodeFormData.title || !currentManagingSeries?._id || (!isEditingPodcastEpisode && !podcastEpisodeThumbnailFile) ) { setEpisodeModalError('Episode Title, Series selection & Thumbnail required for new entries.'); return; } const fd = new FormData(); fd.append('podcastSeriesId', currentManagingSeries._id); Object.entries(podcastEpisodeFormData).forEach(([key, value]) => { if (key === '_id' && !value) return; if (key === 'thumbnail' && value === undefined && isEditingPodcastEpisode) return; if (key === 'podcastSeries') return; fd.append(key, value || ''); }); if (podcastEpisodeThumbnailFile) fd.append('thumbnailFile', podcastEpisodeThumbnailFile); const endpoint = isEditingPodcastEpisode && podcastEpisodeFormData._id ? `/podcast-episodes/${podcastEpisodeFormData._id}` : '/podcast-episodes'; const method = isEditingPodcastEpisode ? 'PUT' : 'POST'; const message = isEditingPodcastEpisode ? 'Episode updated!' : 'Episode added!'; handleSubmitApi(endpoint, method, fd, 'podcastEpisode', message, true); };
  const handleProgramSubmit = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); if (!programFormData.title || (!isEditingProgram && !programThumbnailFile)) { setError('Program Title & Thumbnail required for new entries.'); return; } const fd = new FormData(); Object.entries(programFormData).forEach(([key, value]) => { if (key === '_id' && !value) return; if (key === 'thumbnail' && value === undefined && isEditingProgram) return; fd.append(key, value || ''); }); if (programThumbnailFile) fd.append('thumbnailFile', programThumbnailFile); const endpoint = isEditingProgram && programFormData._id ? `/programs/${programFormData._id}` : '/programs'; const method = isEditingProgram ? 'PUT' : 'POST'; const message = isEditingProgram ? 'Program updated!' : 'Program added!'; handleSubmitApi(endpoint, method, fd, 'program', message); };
  const handleEbookSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!ebookFormData.title || (!isEditingEbook && !ebookThumbnailFile) || (!isEditingEbook && !ebookPdfFile) ) {
      setError('Ebook Title, Thumbnail & PDF required for new entries.');
      return;
    }
    const fd = new FormData();
    Object.entries(ebookFormData).forEach(([key, value]) => {
      if (key === '_id' && !value) return;
      if ((key === 'thumbnail' || key === 'pdfFile') && value === undefined && isEditingEbook) return;
      fd.append(key, value || '');
    });
    if (ebookThumbnailFile) fd.append('thumbnailFile', ebookThumbnailFile);
    if (ebookPdfFile) fd.append('pdfFileNew', ebookPdfFile);
    
    const endpoint = isEditingEbook && ebookFormData._id ? `/ebooks/${ebookFormData._id}` : '/ebooks';
    const method = isEditingEbook ? 'PUT' : 'POST';
    const message = isEditingEbook ? 'E-book updated!' : 'E-book added!';
    handleSubmitApi(endpoint, method, fd, 'ebook', message);
  };
  const handleNutritionPlanSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    if (!nutritionPlanFormData.title || !nutritionPlanFormData.description || !nutritionPlanFormData.price || !nutritionPlanFormData.category || (!isEditingNutrition && !nutritionThumbnailFile) || (!isEditingNutrition && !nutritionPdfFile) ) {
         setError('Nutrition: Title, Desc, Price, Category, Thumbnail & PDF required for new entries.'); return; 
    } 
    const fd = new FormData(); 
    Object.entries(nutritionPlanFormData).forEach(([key, value]) => { 
        if (key === '_id' && !value) return; 
        if ((key === 'thumbnail' || key === 'pdfFile') && value === undefined && isEditingNutrition) return; 
        fd.append(key, value || '');
    }); 
    if (nutritionThumbnailFile) fd.append('thumbnailFile', nutritionThumbnailFile); 
    if (nutritionPdfFile) fd.append('pdfFileNew', nutritionPdfFile); 
    const endpoint = isEditingNutrition && nutritionPlanFormData._id ? `/nutrition-plans/${nutritionPlanFormData._id}` : '/nutrition-plans'; 
    const method = isEditingNutrition ? 'PUT' : 'POST'; 
    const message = isEditingNutrition ? 'Nutrition Plan updated!' : 'Nutrition Plan added!'; 
    handleSubmitApi(endpoint, method, fd, 'nutrition', message); 
  };
  const handleBlogPostSubmit = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); if (!blogFormData.title || !blogFormData.content || !blogFormData.excerpt || !blogFormData.categories || (!isEditingBlog && !blogCoverImageFile)) { setError('Blog: Title, Content, Excerpt, Categories required. Cover Image for new posts.'); return; } const fd = new FormData(); Object.entries(blogFormData).forEach(([key, value]) => { if (key === '_id' && !value) return; if (key === 'coverImage' && value === undefined && isEditingBlog) return; if (key === 'isFeatured') fd.append(key, String(value)); else fd.append(key, value || ''); }); if (blogCoverImageFile) fd.append('coverImageFile', blogCoverImageFile); const endpoint = isEditingBlog && blogFormData._id ? `/blogs/${blogFormData._id}` : '/blogs'; const method = isEditingBlog ? 'PUT' : 'POST'; const message = isEditingBlog ? 'Blog post updated!' : 'Blog post added!'; handleSubmitApi(endpoint, method, fd, 'blog', message); };

  const fetchPodcastSeries = useCallback(async () => {
    setIsLoadingItems(true); setListError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/podcast-series?limit=100&sortBy=createdAt&order=desc`);
      if (!response.ok) throw new Error(`Failed to fetch podcast series`);
      const result = await response.json();
      if (result.success) {
        setPodcastSeriesList(result.data.map((item: any) => ({...item, thumbnail: { url: item.coverImageUrl } })));
      } else {
        throw new Error(result.message || result.error || `Error fetching podcast series`);
      }
    } catch (err: any) { console.error(`Error fetching podcast series:`, err); setListError(err.message); }
    finally { setIsLoadingItems(false); }
  }, []);

  const fetchPodcastEpisodesForSeries = useCallback(async (seriesId: string) => {
    if (!seriesId) return;
    setEpisodeLoading(true); setEpisodeModalError(null);
    try {
        const response = await fetch(`${API_BASE_URL}/podcast-episodes/series/${seriesId}?sortBy=episodeNumber&order=asc`);
        if (!response.ok) throw new Error(`Failed to fetch episodes for series ${seriesId}`);
        const result = await response.json();
        if (result.success) {
            setPodcastEpisodeList(result.data);
        } else {
            throw new Error(result.message || result.error || `Error fetching episodes`);
        }
    } catch (err:any) {
        console.error(`Error fetching episodes for series ${seriesId}:`, err);
        setEpisodeModalError(err.message);
        setPodcastEpisodeList([]);
    } finally {
        setEpisodeLoading(false);
    }
  }, []);

  const fetchItems = useCallback(async (itemType: string, setItems: React.Dispatch<React.SetStateAction<any[]>>, endpoint: string) => {
    setIsLoadingItems(true); setListError(null);
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}?limit=100&sortBy=createdAt&order=desc`);
        if (!response.ok) throw new Error(`Failed to fetch ${itemType}`);
        const result = await response.json(); 
        if (result.success) {
            let fetchedData = result.data;
            if (itemType === 'programs' || itemType === 'ebooks') {
                fetchedData = result.data.map((item: any) => ({ ...item, thumbnail: item.thumbnailUrl ? { url: item.thumbnailUrl } : (item.thumbnail || undefined) }));
            } else if (itemType === 'nutrition-plans') {
                 fetchedData = result.data.map((item: any) => ({ ...item, thumbnail: item.thumbnail ? { url: item.thumbnail.url } : undefined, razorpayPaymentLink: item.razorpayPaymentLink || '' }));
            }
            setItems(fetchedData);
        } else { throw new Error(result.message || result.error || `Error fetching ${itemType}`); }
    } catch (err: any) { console.error(`Error in fetchItems for ${itemType}:`, err); setListError(err.message); }
    finally { setIsLoadingItems(false); }
  }, []);

  const fetchBlogPosts = useCallback(async () => { setIsLoadingItems(true); setListError(null); try { const response = await fetch(`${API_BASE_URL}/blogs?limit=100&sortBy=createdAt&order=desc&status=all`); if (!response.ok) throw new Error("Failed to fetch blog posts"); const data = await response.json(); if (data.success) setBlogPosts(data.data); else throw new Error(data.error || "Error fetching blogs"); } catch (err: any) { console.error(err); setListError(err.message); } finally { setIsLoadingItems(false); } }, []);
  const fetchBlogCategories = useCallback(async () => { try { const response = await fetch(`${API_BASE_URL}/blogs/categories`); if (!response.ok) throw new Error("Failed to fetch blog categories"); const data = await response.json(); if (data.success) setBlogCategories(data.data); } catch (err:any) { console.error("Error fetching blog categories", err); } }, []);

  useEffect(() => {
    if (activeSection === 'podcastSeries') fetchPodcastSeries();
    else if (activeSection === 'program') fetchItems('programs', setPrograms, '/programs');
    else if (activeSection === 'ebook') fetchItems('ebooks', setEbooks, '/ebooks');
    else if (activeSection === 'nutrition') fetchItems('nutrition-plans', setNutritionPlans, '/nutrition-plans');
    else if (activeSection === 'blog') { fetchBlogPosts(); fetchBlogCategories(); }
  }, [activeSection, fetchItems, fetchPodcastSeries, fetchBlogPosts, fetchBlogCategories]);

  const handleEditPodcastSeries = async (series: PodcastSeriesListItem) => {
    const response = await fetch(`${API_BASE_URL}/podcast-series/${series._id}`);
    if (!response.ok) { setError(`Failed to fetch series details: ${series.title}`); return; }
    const result = await response.json();
    if (result.success) {
      const fullSeries = result.data;
      setPodcastSeriesFormData({
        _id: fullSeries._id,
        title: fullSeries.title,
        description: fullSeries.description,
        category: fullSeries.category || '',
        author: fullSeries.author || '',
        coverImage: fullSeries.coverImageUrl || undefined,
      });
      setPodcastSeriesCoverPreview(fullSeries.coverImageUrl || null);
      setPodcastSeriesCoverFile(null);
      setIsEditingPodcastSeries(true);
      document.getElementById('podcastSeries-form-section')?.scrollIntoView({ behavior: "smooth" });
    } else {
      setError(result.error || 'Could not load series data for editing.');
    }
  };

  const handleEditPodcastEpisode = async (episode: PodcastEpisodeListItem) => {
    const response = await fetch(`${API_BASE_URL}/podcast-episodes/${episode._id}`);
    if (!response.ok) { setEpisodeModalError(`Failed to fetch episode details: ${episode.title}`); return; }
    const result = await response.json();
    if (result.success) {
      const fullEpisode = result.data;
      setPodcastEpisodeFormData({
        _id: fullEpisode._id,
        podcastSeries: fullEpisode.podcastSeries,
        title: fullEpisode.title,
        description: fullEpisode.description,
        youtubeLink: fullEpisode.youtubeLink,
        duration: fullEpisode.duration,
        episodeNumber: String(fullEpisode.episodeNumber || ''),
        publishDate: fullEpisode.publishDate ? new Date(fullEpisode.publishDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        thumbnail: fullEpisode.thumbnailUrl || undefined,
      });
      setPodcastEpisodeThumbnailPreview(fullEpisode.thumbnailUrl || null);
      setPodcastEpisodeThumbnailFile(null);
      setIsEditingPodcastEpisode(true);
    } else {
      setEpisodeModalError(result.error || 'Could not load episode data for editing.');
    }
  };

  const handleEditItem = async ( item: AllListItems, section: 'program' | 'ebook' | 'nutrition' | 'blog' ) => {
    setLoading(true); setError(null);
    try {
        let identifier: string; let endpointPath: string;
        if (section === 'blog') { const blogItem = item as BlogPostForList; identifier = blogItem.slug; endpointPath = `/blogs/slug/${identifier}`; } 
        else if(section === 'nutrition'){ identifier = item._id; endpointPath = `/nutrition-plans/id/${identifier}`; }
        else if (section === 'ebook') { identifier = item._id; endpointPath = `/ebooks/id/${identifier}`; }
        else { identifier = item._id; endpointPath = `/programs/id/${identifier}`; }

        const response = await fetch(`${API_BASE_URL}${endpointPath}`);
        if (!response.ok) throw new Error(`Failed to fetch full ${section} details. Status: ${response.status}`);
        const result = await response.json();
        if (result.success && result.data) {
            const fullItem: any = result.data; 
            if (section === 'program') { 
                const backendData = fullItem as ProgramFormData & {thumbnailUrl?:string}; 
                setProgramFormData({ ...backendData, thumbnail: backendData.thumbnailUrl || undefined }); 
                setProgramThumbnailPreview(backendData.thumbnailUrl || null); 
                setProgramThumbnailFile(null); 
                setIsEditingProgram(true); 
            } 
            else if (section === 'ebook') {
                const backendData = fullItem as EbookFormData & {thumbnailUrl?:string, pdfFileUrl?: string, razorpayPaymentLink?: string};
                setEbookFormData({ 
                    ...backendData,
                    category: backendData.category || '',
                    thumbnail: backendData.thumbnailUrl || undefined,
                    pdfFile: backendData.pdfFileUrl || undefined,
                    razorpayPaymentLink: backendData.razorpayPaymentLink || ''
                });
                setEbookThumbnailPreview(backendData.thumbnailUrl || null);
                setEbookPdfFileName(backendData.pdfFileUrl || null);
                setEbookThumbnailFile(null);
                setEbookPdfFile(null);
                setIsEditingEbook(true);
            } 
            else if (section === 'nutrition') { 
                const backendData = fullItem as NutritionPlanFormData & { thumbnail?: { url: string }, pdfDocument?: { url: string } };
                setNutritionPlanFormData({ 
                    ...backendData, 
                    category: backendData.category || '', 
                    thumbnail: backendData.thumbnail?.url || undefined, 
                    pdfFile: backendData.pdfDocument?.url || undefined,
                    razorpayPaymentLink: backendData.razorpayPaymentLink || ''
                }); 
                setNutritionThumbnailPreview(backendData.thumbnail?.url || null); 
                setNutritionPdfFileName(backendData.pdfDocument?.url || null); 
                setNutritionThumbnailFile(null); setNutritionPdfFile(null); 
                setIsEditingNutrition(true); 
            } 
            else if (section === 'blog') { 
                const blogPost = fullItem as BlogPost; 
                setBlogFormData({ 
                    _id: blogPost._id, title: blogPost.title, content: blogPost.content, excerpt: blogPost.excerpt, 
                    categories: blogPost.categories.join(', '), isFeatured: blogPost.isFeatured || false, 
                    status: blogPost.status || 'draft', 
                    author: (typeof blogPost.author === 'string' ? blogPost.author : (blogPost.author as any)?.name) || 'Dr. Yogita Physiotherapy', 
                    metaTitle: blogPost.metaTitle || '', metaDescription: blogPost.metaDescription || '', 
                    readingTime: blogPost.readingTime || '', coverImage: blogPost.coverImage?.url || undefined 
                }); 
                setBlogCoverImagePreview(blogPost.coverImage?.url || null); 
                setBlogCoverImageFile(null); 
                setIsEditingBlog(true); 
            }
        } else { throw new Error(result.error || result.message || `Could not load ${section} data for editing.`); }
    } catch (err: any) { setError(`Error loading ${section} for editing: ${err.message}`); if (section === 'program') setIsEditingProgram(false); else if (section === 'ebook') setIsEditingEbook(false); else if (section === 'nutrition') setIsEditingNutrition(false); else if (section === 'blog') setIsEditingBlog(false); } 
    finally { setLoading(false); }
    document.getElementById(`${section}-form-section`)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDeletePodcastSeries = async (seriesId: string) => { if (!window.confirm(`Are you sure you want to delete this Podcast Series and ALL its episodes? This action cannot be undone.`)) return; setLoading(true); setError(null); setSuccess(null); try { const response = await fetch(`${API_BASE_URL}/podcast-series/${seriesId}`, { method: 'DELETE' }); const result = await response.json(); if (!response.ok || !result.success) throw new Error(result.error || result.message || `Failed to delete podcast series`); setSuccess(`Podcast series deleted successfully!`); fetchPodcastSeries(); } catch (err: any) { setError(err.message); } finally { setLoading(false); setTimeout(() => { setSuccess(null); setError(null); }, 3000); } };
  const handleDeletePodcastEpisode = async (episodeId: string) => { if (!window.confirm(`Are you sure you want to delete this episode?`)) return; setEpisodeLoading(true); setEpisodeModalError(null); setEpisodeModalSuccess(null); try { const response = await fetch(`${API_BASE_URL}/podcast-episodes/${episodeId}`, { method: 'DELETE' }); const result = await response.json(); if (!response.ok || !result.success) throw new Error(result.error || result.message || `Failed to delete episode`); setEpisodeModalSuccess(`Episode deleted successfully!`); if (currentManagingSeries) fetchPodcastEpisodesForSeries(currentManagingSeries._id); } catch (err: any) { setEpisodeModalError(err.message); } finally { setEpisodeLoading(false); setTimeout(() => { setEpisodeModalSuccess(null); setEpisodeModalError(null); }, 3000); } };
  const handleDeleteItem = async (itemId: string, itemType: string, endpoint: string, fetchListFunction: () => void) => { if (!window.confirm(`Are you sure you want to delete this ${itemType}?`)) return; setLoading(true); setError(null); setSuccess(null); try { const response = await fetch(`${API_BASE_URL}${endpoint}/${itemId}`, { method: 'DELETE' }); const result = await response.json(); if (!response.ok && !result.success && result.message !== `${itemType.charAt(0).toUpperCase() + itemType.slice(1)} removed`) throw new Error(result.error || result.message || `Failed to delete ${itemType}`); setSuccess(`${itemType.charAt(0).toUpperCase() + itemType.slice(1)} deleted successfully!`); fetchListFunction(); } catch (err: any) { setError(err.message); } finally { setLoading(false); setTimeout(() => { setSuccess(null); setError(null); }, 3000); } };
  
  const handleAddNew = (section: 'podcastSeries' | 'program' | 'ebook' | 'nutrition' | 'blog' | 'podcastEpisode') => { resetForm(section); };
  
  const switchSection = (section: 'podcastSeries' | 'program' | 'ebook' | 'nutrition' | 'blog') => { 
    setActiveSection(section); 
    if (section !== 'podcastSeries' && isEditingPodcastSeries) resetForm('podcastSeries');
    if (section !== 'program' && isEditingProgram) resetForm('program'); 
    if (section !== 'ebook' && isEditingEbook) resetForm('ebook'); 
    if (section !== 'nutrition' && isEditingNutrition) resetForm('nutrition'); 
    if (section !== 'blog' && isEditingBlog) resetForm('blog'); 
    if (section === 'podcastSeries' && !isEditingPodcastSeries) resetForm('podcastSeries');
    else if (section === 'program' && !isEditingProgram) resetForm('program'); 
    else if (section === 'ebook' && !isEditingEbook) resetForm('ebook'); 
    else if (section === 'nutrition' && !isEditingNutrition) resetForm('nutrition'); 
    else if (section === 'blog' && !isEditingBlog) resetForm('blog'); 
    setError(null); setSuccess(null); 
  };

  const openEpisodeModal = (series: PodcastSeriesListItem) => { setCurrentManagingSeries(series); setPodcastEpisodeList([]); fetchPodcastEpisodesForSeries(series._id); resetForm('podcastEpisode'); setIsEpisodeModalOpen(true); };
  
  const renderFileInput = ( 
    id: string, 
    label: string, 
    ref: React.RefObject<HTMLInputElement | null>, 
    onChange: (e: ChangeEvent<HTMLInputElement>) => void, 
    previewSrcOrFilename: string | null, 
    isPdf: boolean = false, 
    isRequired: boolean = true, 
    isEditing: boolean = false, 
  ) => {
    const displayImageUrl = isPdf ? undefined : getFullImageUrl(previewSrcOrFilename || undefined); // Ensure undefined if previewSrcOrFilename is null
    const displayPdfInfo = isPdf && previewSrcOrFilename 
        ? (previewSrcOrFilename.startsWith('http') || previewSrcOrFilename.startsWith('/uploads') 
            ? `Existing: ${previewSrcOrFilename.substring(previewSrcOrFilename.lastIndexOf('/') + 1)}` 
            : `Selected: ${previewSrcOrFilename}`)
        : null;

    return (
    <div className="mb-6">
      <label htmlFor={id} className={LABEL_CLASS}>{label} {(isRequired && !isEditing) && <span className="text-red-500">*</span>} {isEditing && <span className="text-xs text-gray-500"> (Optional: only if changing)</span>}</label>
      <div className="relative mt-1 flex items-center">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"> {isPdf ? <FileUp className={ICON_CLASS} /> : <ImageIcon className={ICON_CLASS} />} </span>
        <Input type="file" name={id} id={id} ref={ref} onChange={onChange} required={isRequired && !isEditing} accept={isPdf ? "application/pdf" : "image/jpeg,image/png,image/gif,image/webp"} className={FILE_INPUT_STYLING}/>
      </div>
      {isPdf && displayPdfInfo && <p className="mt-2 text-xs text-gray-600">{displayPdfInfo}</p>}
      {!isPdf && displayImageUrl && ( // Only render NextImage if displayImageUrl is a valid string
        <div className="mt-3">
          <p className="text-xs text-gray-500 mb-1">Preview:</p>
          <NextImage 
            src={displayImageUrl} 
            alt={`${label} Preview`} 
            width={150} height={90} 
            className="rounded-md object-cover border border-gray-200" 
            unoptimized={true}
          />
        </div>
      )}
    </div>
  )};

  const renderItemList = <TItem extends ListItem>( items: TItem[], itemType: string, handleEdit: (item: TItem) => void, handleDelete: (itemId: string) => void, fetchListFunction: () => void, additionalActions?: (item: TItem) => React.ReactNode ) => (
    <div className="mt-12 pt-6 border-t border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Manage Existing {itemType.charAt(0).toUpperCase() + itemType.slice(1).replace('-', ' ').replace('Series', ' Series')}</h3>
        <Button variant="outline" size="sm" onClick={fetchListFunction} disabled={isLoadingItems}> {isLoadingItems ? <Loader2 className="h-4 w-4 animate-spin mr-2"/> : <ListChecks className="h-4 w-4 mr-2" />}Refresh List</Button>
      </div>
      {isLoadingItems && <div className="flex justify-center py-4"><Loader2 className="h-8 w-8 animate-spin text-pink-500"/></div>}
      {listError && <p className="text-red-500 bg-red-50 p-3 rounded-md">{listError}</p>}
      {!isLoadingItems && !listError && items.length === 0 && <p className="text-gray-500">No {itemType.replace('-', ' ').replace('Series', ' Series')} found.</p>}
      {!isLoadingItems && !listError && items.length > 0 && (
        <ul className="space-y-3">
          {items.map(item => {
            const castItem = item as any;
            let itemDisplayThumbnailUrl: string | undefined = undefined; // Ensure it's string | undefined

            if (castItem.coverImageUrl) itemDisplayThumbnailUrl = getFullImageUrl(castItem.coverImageUrl);
            else if (castItem.thumbnail?.url) itemDisplayThumbnailUrl = getFullImageUrl(castItem.thumbnail.url);
            else if (castItem.thumbnailUrl) itemDisplayThumbnailUrl = getFullImageUrl(castItem.thumbnailUrl);
            else if (castItem.coverImage?.url) itemDisplayThumbnailUrl = getFullImageUrl(castItem.coverImage.url);

            return (
            <li key={item._id} className="p-4 bg-white border border-gray-200 rounded-md shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="flex items-center mb-2 sm:mb-0 flex-grow min-w-0">
                {itemDisplayThumbnailUrl &&  // Only render NextImage if URL is valid
                    <NextImage 
                        src={itemDisplayThumbnailUrl} 
                        alt={item.title} 
                        width={60} height={40} 
                        className="rounded object-cover mr-3 flex-shrink-0"
                        unoptimized={true}
                    />
                }
                <div className="min-w-0 flex-grow">
                    <h4 className="font-medium text-gray-800 truncate" title={item.title}>{item.title}</h4>
                    {itemType === 'podcastSeries' && castItem.description && <p className="text-xs text-gray-500 truncate" title={castItem.description}>{castItem.description.substring(0,100)}...</p>}
                    {itemType === 'podcastEpisode' && castItem.episodeNumber && <p className="text-xs text-gray-500">Ep: {castItem.episodeNumber}</p>}
                    {(itemType === 'program' || itemType === 'e-book' || itemType === 'nutrition-plan') && castItem.price != null && <p className="text-xs text-gray-500">Price (INR): {castItem.price}</p>}
                    {(itemType === 'e-book' || itemType === 'nutrition-plan') && castItem.razorpayPaymentLink && 
                      <p className="text-xs text-gray-500 truncate" title={castItem.razorpayPaymentLink}>
                        Payment Link: <a href={castItem.razorpayPaymentLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{castItem.razorpayPaymentLink.substring(0,30)}...</a>
                      </p>
                    }
                    {(itemType === 'e-book' || itemType === 'nutrition-plan') && castItem.category && <p className="text-xs text-gray-500">Category: {castItem.category}</p>}
                 </div>
              </div>
              <div className="flex space-x-2 self-end sm:self-center flex-shrink-0 mt-2 sm:mt-0">
                {additionalActions && additionalActions(item)}
                <Button variant="outline" size="sm" onClick={() => handleEdit(item)} className="text-blue-600 border-blue-300 hover:bg-blue-50"><Edit className="h-4 w-4 mr-1"/> Edit</Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(item._id)} className="bg-red-500 hover:bg-red-600"><Trash2 className="h-4 w-4 mr-1"/> Delete</Button>
              </div>
            </li>
          )})}
        </ul>
      )}
    </div>
  );

  // --- JSX ---
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 text-center mt-12"><h1 className="text-4xl font-bold tracking-tight text-pink-700">Admin Dashboard</h1><p className="mt-2 text-lg text-gray-600">Content Management</p></header>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
            <Button onClick={() => switchSection('podcastSeries')} className={activeSection === 'podcastSeries' ? ACTIVE_TAB_BUTTON : INACTIVE_TAB_BUTTON}><Film className="inline h-4 w-4 mr-1 mb-0.5" /> Podcasts</Button>
            <Button onClick={() => switchSection('program')} className={activeSection === 'program' ? ACTIVE_TAB_BUTTON : INACTIVE_TAB_BUTTON}><Video className="inline h-4 w-4 mr-1 mb-0.5" /> Programs</Button>
            <Button onClick={() => switchSection('ebook')} className={activeSection === 'ebook' ? ACTIVE_TAB_BUTTON : INACTIVE_TAB_BUTTON}><Book className="inline h-4 w-4 mr-1 mb-0.5" /> E-Books</Button>
            <Button onClick={() => switchSection('nutrition')} className={activeSection === 'nutrition' ? ACTIVE_TAB_BUTTON : INACTIVE_TAB_BUTTON}><Leaf className="inline h-4 w-4 mr-1 mb-0.5" /> Nutrition</Button>
            <Button onClick={() => switchSection('blog')} className={activeSection === 'blog' ? ACTIVE_TAB_BUTTON : INACTIVE_TAB_BUTTON}><Edit3 className="inline h-4 w-4 mr-1 mb-0.5" /> Blog</Button>
        </div>
        {success && <div className="mb-4 p-3 rounded-md bg-green-50 text-green-700 flex items-center"><CheckCircle className="h-5 w-5 mr-2"/> {success}</div>}
        {error && <div className="mb-4 p-3 rounded-md bg-red-50 text-red-700 flex items-center"><AlertCircle className="h-5 w-5 mr-2"/> {error}</div>}

        {/* Podcast Series Section */}
        {activeSection === 'podcastSeries' && ( <motion.section id="podcastSeries-form-section" key="podcastSeries-form" className="bg-white p-6 sm:p-8 shadow-xl rounded-lg">
            <div className="flex items-center justify-between mb-6"> <div className="flex items-center"><PlusCircle className="h-8 w-8 text-pink-600 mr-3" /><h2 className="text-2xl font-semibold text-gray-800">{isEditingPodcastSeries ? 'Edit Podcast Series' : 'Add Podcast Series'}</h2></div> {isEditingPodcastSeries && (<Button variant="outline" size="sm" onClick={()=>handleAddNew('podcastSeries')}><PlusCircle className="h-4 w-4 mr-2" /> Add New Series</Button>)} </div>
            <form onSubmit={handlePodcastSeriesSubmit} className="space-y-6">
                <div><label htmlFor="title-podcastSeries" className={LABEL_CLASS}>Series Title <span className="text-red-500">*</span></label><div className="relative"><Type className={`${ICON_CLASS} absolute left-3 top-1/2 -translate-y-1/2`}/><Input type="text" name="title" id="title-podcastSeries" value={podcastSeriesFormData.title} onChange={(e) => handleInputChange(e)} required className={INPUT_CLASS}/></div></div>
                {renderFileInput("coverImage-podcastSeries", "Series Cover Image", podcastSeriesCoverRef, handlePodcastSeriesCoverChange, podcastSeriesCoverPreview, false, true, isEditingPodcastSeries)}
                <div><label htmlFor="description-podcastSeries" className={LABEL_CLASS}>Series Description <span className="text-red-500">*</span></label><div className="relative"><FileText className={`${ICON_CLASS} absolute left-3 top-3`}/><Textarea name="description" id="description-podcastSeries" value={podcastSeriesFormData.description} onChange={(e) => handleInputChange(e)} rows={4} required className={TEXTAREA_CLASS_NAME}></Textarea></div></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label htmlFor="category-podcastSeries" className={LABEL_CLASS}>Category (Opt)</label><div className="relative"><Type className={`${ICON_CLASS} absolute left-3 top-1/2 -translate-y-1/2`}/><Input type="text" name="category" id="category-podcastSeries" value={podcastSeriesFormData.category || ''} onChange={(e) => handleInputChange(e)} className={INPUT_CLASS}/></div></div>
                    <div><label htmlFor="author-podcastSeries" className={LABEL_CLASS}>Author (Opt)</label><div className="relative"><Type className={`${ICON_CLASS} absolute left-3 top-1/2 -translate-y-1/2`}/><Input type="text" name="author" id="author-podcastSeries" value={podcastSeriesFormData.author || ''} onChange={(e) => handleInputChange(e)} className={INPUT_CLASS}/></div></div>
                </div>
                <div className="pt-2"><Button type="submit" disabled={loading} className={SUBMIT_BUTTON_CLASS}> {loading ? <Loader2 className="animate-spin mr-2 h-5 w-5"/> : <PlusCircle className="h-5 w-5 mr-2" />}{isEditingPodcastSeries ? 'Update Series' : 'Add Series'} </Button></div>
            </form>
            {renderItemList<PodcastSeriesListItem>(podcastSeriesList, 'podcastSeries', 
                (item) => handleEditPodcastSeries(item), 
                (id) => handleDeletePodcastSeries(id), 
                () => fetchPodcastSeries(),
                (item) => (
                    <Button variant="ghost" size="sm" onClick={() => openEpisodeModal(item)} className="text-purple-600 hover:bg-purple-50">
                        <SlidersHorizontal className="h-4 w-4 mr-1"/> Manage Episodes
                    </Button>
                )
            )}
        </motion.section> )}

        {/* Program Section */}
        {activeSection === 'program' && ( <motion.section id="program-form-section" key="program-form" className="bg-white p-6 sm:p-8 shadow-xl rounded-lg">
            <div className="flex items-center justify-between mb-6"> <div className="flex items-center"><PlusCircle className="h-8 w-8 text-pink-600 mr-3" /><h2 className="text-2xl font-semibold text-gray-800">{isEditingProgram ? 'Edit Program' : 'Add New Program'}</h2></div> {isEditingProgram && (<Button variant="outline" size="sm" onClick={()=>handleAddNew('program')}><PlusCircle className="h-4 w-4 mr-2" /> Add New</Button>)} </div>
            <form onSubmit={handleProgramSubmit} className="space-y-6">
                <div><label htmlFor="title-program" className={LABEL_CLASS}>Title <span className="text-red-500">*</span></label><div className="relative"><Video className={`${ICON_CLASS} absolute left-3 top-1/2 -translate-y-1/2`}/><Input type="text" name="title" id="title-program" value={programFormData.title} onChange={handleInputChange} required className={INPUT_CLASS}/></div></div>
                {renderFileInput("thumbnail-program", "Thumbnail", programThumbnailRef, handleProgramThumbnailChange, programThumbnailPreview, false, true, isEditingProgram)}
                <div><label htmlFor="description-program" className={LABEL_CLASS}>Description <span className="text-red-500">*</span></label><div className="relative"><FileText className={`${ICON_CLASS} absolute left-3 top-3`}/><Textarea name="description" id="description-program" value={programFormData.description} onChange={handleInputChange} rows={4} required className={TEXTAREA_CLASS_NAME}></Textarea></div></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label htmlFor="price-program" className={LABEL_CLASS}>Price (INR) <span className="text-red-500">*</span></label><div className="relative"><DollarSign className={`${ICON_CLASS} absolute left-3 top-1/2 -translate-y-1/2`}/><Input type="number" name="price" id="price-program" value={programFormData.price} onChange={handleInputChange} required className={INPUT_CLASS} min="0"/></div></div>
                    <div><label htmlFor="duration-program" className={LABEL_CLASS}>Duration <span className="text-red-500">*</span></label><div className="relative"><Clock className={`${ICON_CLASS} absolute left-3 top-1/2 -translate-y-1/2`}/><Input type="text" name="duration" id="duration-program" value={programFormData.duration} onChange={handleInputChange} required className={INPUT_CLASS}/></div></div>
                </div>
                <div><label htmlFor="youtubeLink-program" className={LABEL_CLASS}>YouTube Link (Opt)</label><div className="relative"><Youtube className={`${ICON_CLASS} absolute left-3 top-1/2 -translate-y-1/2`}/><Input type="url" name="youtubeLink" id="youtubeLink-program" value={programFormData.youtubeLink} onChange={handleInputChange} className={INPUT_CLASS}/></div></div>
                <div className="pt-2"><Button type="submit" disabled={loading} className={SUBMIT_BUTTON_CLASS}> {loading ? <Loader2 className="animate-spin mr-2 h-5 w-5"/> : <PlusCircle className="h-5 w-5 mr-2" />}{isEditingProgram ? 'Update Program' : 'Add Program'} </Button></div>
            </form>
            {renderItemList<ProgramListItem>(programs, 'program', (item) => handleEditItem(item as AllListItems, 'program'), (id) => handleDeleteItem(id, 'program', '/programs', () => fetchItems('programs', setPrograms, '/programs')), () => fetchItems('programs', setPrograms, '/programs'))}
        </motion.section> )}

        {/* Ebook Section */}
        {activeSection === 'ebook' && ( <motion.section id="ebook-form-section" key="ebook-form" className="bg-white p-6 sm:p-8 shadow-xl rounded-lg">
            <div className="flex items-center justify-between mb-6"> <div className="flex items-center"><PlusCircle className="h-8 w-8 text-pink-600 mr-3" /><h2 className="text-2xl font-semibold text-gray-800">{isEditingEbook ? 'Edit E-Book' : 'Add New E-Book'}</h2></div> {isEditingEbook && (<Button variant="outline" size="sm" onClick={()=>handleAddNew('ebook')}><PlusCircle className="h-4 w-4 mr-2" /> Add New</Button>)} </div>
            <form onSubmit={handleEbookSubmit} className="space-y-6">
                <div><label htmlFor="title-ebook" className={LABEL_CLASS}>Title <span className="text-red-500">*</span></label><div className="relative"><BookOpen className={`${ICON_CLASS} absolute left-3 top-1/2 -translate-y-1/2`}/><Input type="text" name="title" id="title-ebook" value={ebookFormData.title} onChange={handleInputChange} required className={INPUT_CLASS}/></div></div>
                {renderFileInput("thumbnail-ebook", "Ebook Thumbnail", ebookThumbnailRef, handleEbookThumbnailChange, ebookThumbnailPreview, false, true, isEditingEbook)}
                {renderFileInput("pdfFile-ebook", "Ebook PDF File", ebookPdfRef, handleEbookPdfChange, ebookPdfFileName, true, true, isEditingEbook)}
                <div><label htmlFor="description-ebook" className={LABEL_CLASS}>Description <span className="text-red-500">*</span></label><div className="relative"><FileText className={`${ICON_CLASS} absolute left-3 top-3`}/><Textarea name="description" id="description-ebook" value={ebookFormData.description} onChange={handleInputChange} rows={3} required className={TEXTAREA_CLASS_NAME}></Textarea></div></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label htmlFor="price-ebook" className={LABEL_CLASS}>Price (INR) <span className="text-red-500">*</span></label><div className="relative"><DollarSign className={`${ICON_CLASS} absolute left-3 top-1/2 -translate-y-1/2`}/><Input type="number" name="price" id="price-ebook" value={ebookFormData.price} onChange={handleInputChange} required className={INPUT_CLASS} min="0"/></div></div>
                    <div><label htmlFor="pages-ebook" className={LABEL_CLASS}>Pages <span className="text-red-500">*</span></label><div className="relative"><Paperclip className={`${ICON_CLASS} absolute left-3 top-1/2 -translate-y-1/2`}/><Input type="number" name="pages" id="pages-ebook" value={ebookFormData.pages} onChange={handleInputChange} required className={INPUT_CLASS} min="1"/></div></div>
                </div>
                <div><label htmlFor="category-ebook" className={LABEL_CLASS}>Category <span className="text-red-500">*</span></label><div className="relative"><Type className={`${ICON_CLASS} absolute left-3 top-1/2 -translate-y-1/2`}/><Input type="text" name="category" id="category-ebook" value={ebookFormData.category} onChange={handleInputChange} required className={INPUT_CLASS}/></div></div>
                <div>
                    <label htmlFor="razorpayPaymentLink-ebook" className={LABEL_CLASS}>
                        Razorpay Payment Link (Optional)
                    </label>
                    <div className="relative">
                        <LinkIcon className={`${ICON_CLASS} absolute left-3 top-1/2 -translate-y-1/2`}/>
                        <Input
                            type="url"
                            name="razorpayPaymentLink"
                            id="razorpayPaymentLink-ebook"
                            value={ebookFormData.razorpayPaymentLink || ''}
                            onChange={handleInputChange}
                            placeholder="https://rzp.io/l/yourpaymentlink"
                            className={INPUT_CLASS}
                        />
                    </div>
                </div>
                <div className="pt-2"><Button type="submit" disabled={loading} className={SUBMIT_BUTTON_CLASS}> {loading ? <Loader2 className="animate-spin mr-2 h-5 w-5"/> : <PlusCircle className="h-5 w-5 mr-2" />}{isEditingEbook ? 'Update E-Book' : 'Add E-Book'} </Button></div>
            </form>
             {renderItemList<EbookListItem>(ebooks, 'e-book', (item) => handleEditItem(item as AllListItems, 'ebook'), (id) => handleDeleteItem(id, 'e-book', '/ebooks', () => fetchItems('ebooks', setEbooks, '/ebooks')), () => fetchItems('ebooks', setEbooks, '/ebooks'))}
        </motion.section> )}

        {/* Nutrition Section */}
        {activeSection === 'nutrition' && ( <motion.section id="nutrition-form-section" key="nutrition-form" className="bg-white p-6 sm:p-8 shadow-xl rounded-lg">
            <div className="flex items-center justify-between mb-6"> <div className="flex items-center"><PlusCircle className="h-8 w-8 text-pink-600 mr-3" /><h2 className="text-2xl font-semibold text-gray-800">{isEditingNutrition ? 'Edit Nutrition Plan' : 'Add Nutrition Plan'}</h2></div> {isEditingNutrition && (<Button variant="outline" size="sm" onClick={()=>handleAddNew('nutrition')}><PlusCircle className="h-4 w-4 mr-2" /> Add New</Button>)} </div>
            <form onSubmit={handleNutritionPlanSubmit} className="space-y-6">
                <div><label htmlFor="title-nutrition" className={LABEL_CLASS}>Title <span className="text-red-500">*</span></label><div className="relative"><Leaf className={`${ICON_CLASS} absolute left-3 top-1/2 -translate-y-1/2`}/><Input type="text" name="title" id="title-nutrition" value={nutritionPlanFormData.title} onChange={handleInputChange} required className={INPUT_CLASS}/></div></div>
                {renderFileInput("thumbnail-nutrition", "Thumbnail", nutritionThumbnailRef, handleNutritionThumbnailChange, nutritionThumbnailPreview, false, true, isEditingNutrition)}
                {renderFileInput("pdfFile-nutrition", "Nutrition Plan PDF", nutritionPdfRef, handleNutritionPdfChange, nutritionPdfFileName, true, true, isEditingNutrition)}
                <div><label htmlFor="description-nutrition" className={LABEL_CLASS}>Description <span className="text-red-500">*</span></label><div className="relative"><FileText className={`${ICON_CLASS} absolute left-3 top-3`}/><Textarea name="description" id="description-nutrition" value={nutritionPlanFormData.description} onChange={handleInputChange} rows={3} required className={TEXTAREA_CLASS_NAME}></Textarea></div></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label htmlFor="price-nutrition" className={LABEL_CLASS}>Price (INR) <span className="text-red-500">*</span></label><div className="relative"><DollarSign className={`${ICON_CLASS} absolute left-3 top-1/2 -translate-y-1/2`}/><Input type="number" name="price" id="price-nutrition" value={nutritionPlanFormData.price} onChange={handleInputChange} required className={INPUT_CLASS} min="0"/></div></div>
                    <div><label htmlFor="pages-nutrition" className={LABEL_CLASS}>Pages (Opt)</label><div className="relative"><Paperclip className={`${ICON_CLASS} absolute left-3 top-1/2 -translate-y-1/2`}/><Input type="number" name="pages" id="pages-nutrition" value={nutritionPlanFormData.pages || ''} onChange={handleInputChange} className={INPUT_CLASS} min="1"/></div></div>
                </div>
                <div><label htmlFor="category-nutrition" className={LABEL_CLASS}>Category <span className="text-red-500">*</span></label><div className="relative"><Type className={`${ICON_CLASS} absolute left-3 top-1/2 -translate-y-1/2`}/><Input type="text" name="category" id="category-nutrition" value={nutritionPlanFormData.category} onChange={handleInputChange} required className={INPUT_CLASS}/></div></div>
                <div>
                    <label htmlFor="razorpayPaymentLink-nutrition" className={LABEL_CLASS}>
                        Razorpay Payment Link (Optional)
                    </label>
                    <div className="relative">
                        <LinkIcon className={`${ICON_CLASS} absolute left-3 top-1/2 -translate-y-1/2`}/>
                        <Input
                            type="url"
                            name="razorpayPaymentLink"
                            id="razorpayPaymentLink-nutrition"
                            value={nutritionPlanFormData.razorpayPaymentLink || ''}
                            onChange={handleInputChange}
                            placeholder="https://rzp.io/l/yourpaymentlink"
                            className={INPUT_CLASS}
                        />
                    </div>
                </div>
                <div className="pt-2"><Button type="submit" disabled={loading} className={SUBMIT_BUTTON_CLASS}> {loading ? <Loader2 className="animate-spin mr-2 h-5 w-5"/> : <PlusCircle className="h-5 w-5 mr-2" />}{isEditingNutrition ? 'Update Nutrition Plan':'Add Nutrition Plan'} </Button></div>
            </form>
             {renderItemList<NutritionPlanListItem>(nutritionPlans, 'nutrition-plan', (item) => handleEditItem(item as AllListItems, 'nutrition'), (id) => handleDeleteItem(id, 'nutrition plan', '/nutrition-plans', () => fetchItems('nutrition-plans', setNutritionPlans, '/nutrition-plans')), () => fetchItems('nutrition-plans', setNutritionPlans, '/nutrition-plans'))}
        </motion.section> )}

        {/* Blog Section */}
        {activeSection === 'blog' && ( <motion.section id="blog-form-section" key="blog-form" className="bg-white p-6 sm:p-8 shadow-xl rounded-lg">
            <div className="flex items-center justify-between mb-6"><div className="flex items-center"><PlusCircle className="h-8 w-8 text-pink-600 mr-3" /><h2 className="text-2xl font-semibold text-gray-800">{isEditingBlog ? 'Edit Blog Post' : 'Add New Blog Post'}</h2></div>{isEditingBlog && (<Button variant="outline" size="sm" onClick={()=>handleAddNew('blog')}><PlusCircle className="h-4 w-4 mr-2" /> Add New</Button>)}</div>
            <form onSubmit={handleBlogPostSubmit} className="space-y-6">
                <div><label htmlFor="title-blog" className={LABEL_CLASS}>Title <span className="text-red-500">*</span></label><div className="relative"><Type className={`${ICON_CLASS} absolute left-3 top-1/2 -translate-y-1/2`}/><Input type="text" name="title" id="title-blog" value={blogFormData.title} onChange={handleInputChange} required className={INPUT_CLASS} /></div></div>
                {renderFileInput("coverImage-blog", "Cover Image", blogCoverImageRef, handleBlogCoverImageChange, blogCoverImagePreview, false, true, isEditingBlog)}
                <div><label htmlFor="content-blog" className={LABEL_CLASS}>Content <span className="text-red-500">*</span></label><div className="relative"><FileText className={`${ICON_CLASS} absolute left-3 top-3`}/><Textarea name="content" id="content-blog" value={blogFormData.content} onChange={handleInputChange} rows={10} required className={TEXTAREA_CLASS_NAME}></Textarea></div></div>
                <div><label htmlFor="excerpt-blog" className={LABEL_CLASS}>Excerpt <span className="text-red-500">*</span></label><div className="relative"><FileText className={`${ICON_CLASS} absolute left-3 top-3`}/><Textarea name="excerpt" id="excerpt-blog" value={blogFormData.excerpt} onChange={handleInputChange} rows={3} required maxLength={300} className={TEXTAREA_CLASS_NAME}></Textarea></div></div>
                <div><label htmlFor="categories-blog" className={LABEL_CLASS}>Categories (comma-separated) <span className="text-red-500">*</span></label><div className="relative"><Hash className={`${ICON_CLASS} absolute left-3 top-1/2 -translate-y-1/2`}/><Input type="text" name="categories" id="categories-blog" value={blogFormData.categories} onChange={handleInputChange} required className={INPUT_CLASS}/></div></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label htmlFor="status-blog" className={LABEL_CLASS}>Status</label><select name="status" id="status-blog" value={blogFormData.status} onChange={handleInputChange} className={`${INPUT_CLASS} pl-3`}><option value="draft">Draft</option><option value="published">Published</option></select></div>
                    <div className="flex items-center pt-6"><input type="checkbox" name="isFeatured" id="isFeatured-blog" checked={blogFormData.isFeatured} onChange={handleInputChange} className="h-5 w-5 text-pink-600 border-gray-300 rounded focus:ring-pink-500 mr-2"/><label htmlFor="isFeatured-blog" className="text-sm font-medium text-gray-700">Feature this post?</label></div>
                </div>
                <h3 className="text-lg font-medium text-gray-900 pt-4 border-t">SEO & Optional</h3>
                <div><label htmlFor="author-blog" className={LABEL_CLASS}>Author (Opt)</label><div className="relative"><Type className={`${ICON_CLASS} absolute left-3 top-1/2 -translate-y-1/2`}/><Input type="text" name="author" id="author-blog" value={blogFormData.author || ''} onChange={handleInputChange} className={INPUT_CLASS}/></div></div>
                <div><label htmlFor="readingTime-blog" className={LABEL_CLASS}>Reading Time (Opt)</label><div className="relative"><Clock className={`${ICON_CLASS} absolute left-3 top-1/2 -translate-y-1/2`}/><Input type="text" name="readingTime" id="readingTime-blog" value={blogFormData.readingTime || ''} onChange={handleInputChange} className={INPUT_CLASS}/></div></div>
                <div><label htmlFor="metaTitle-blog" className={LABEL_CLASS}>Meta Title (Opt)</label><div className="relative"><Type className={`${ICON_CLASS} absolute left-3 top-1/2 -translate-y-1/2`}/><Input type="text" name="metaTitle" id="metaTitle-blog" value={blogFormData.metaTitle || ''} onChange={handleInputChange} className={INPUT_CLASS}/></div></div>
                <div><label htmlFor="metaDescription-blog" className={LABEL_CLASS}>Meta Desc. (Opt)</label><div className="relative"><FileText className={`${ICON_CLASS} absolute left-3 top-3`}/><Textarea name="metaDescription" id="metaDescription-blog" value={blogFormData.metaDescription || ''} onChange={handleInputChange} rows={2} className={TEXTAREA_CLASS_NAME}></Textarea></div></div>
                <div className="pt-2"><Button type="submit" disabled={loading} className={SUBMIT_BUTTON_CLASS}> {loading ? <Loader2 className="animate-spin mr-2 h-5 w-5"/> : <PlusCircle className="h-5 w-5 mr-2" />}{isEditingBlog ? 'Update Post' : 'Add Blog Post'} </Button></div>
            </form>
            <div className="mt-12 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-semibold text-gray-800">Manage Existing Blog Posts</h3><Button variant="outline" size="sm" onClick={fetchBlogPosts} disabled={isLoadingItems}>{isLoadingItems ? <Loader2 className="h-4 w-4 animate-spin mr-2"/> : <ListChecks className="h-4 w-4 mr-2" />}Refresh List</Button></div>
                {isLoadingItems && <div className="flex justify-center py-4"><Loader2 className="h-8 w-8 animate-spin text-pink-500"/></div>}
                {listError && activeSection === 'blog' && <p className="text-red-500 bg-red-50 p-3 rounded-md">{listError}</p>}
                {!isLoadingItems && !listError && blogPosts.length === 0 && activeSection === 'blog' && <p className="text-gray-500">No blog posts found.</p>}
                {!isLoadingItems && !listError && blogPosts.length > 0 && activeSection === 'blog' && (<ul className="space-y-3">{blogPosts.map(post => {
                  const coverImgUrl = getFullImageUrl(post.coverImage?.url);
                  return (<li key={post._id} className="p-4 bg-white border border-gray-200 rounded-md shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div className="flex items-center mb-2 sm:mb-0 flex-grow min-w-0">
                        {coverImgUrl && <NextImage src={coverImgUrl} alt={post.title} width={60} height={40} className="rounded object-cover mr-3 flex-shrink-0" unoptimized={true} />}
                        <div className='min-w-0 flex-grow'>
                            <h4 className="font-medium text-gray-800 truncate" title={post.title}>{post.title}</h4>
                            <p className="text-xs text-gray-500">Status: <span className={`font-semibold ${post.status === 'published' ? 'text-green-600' : 'text-yellow-600'}`}>{post.status}</span>{post.isFeatured && <span className="ml-2 text-pink-500">(Featured)</span>}<span className="mx-2">|</span>Categories: {post.categories.join(', ') || 'N/A'}</p>
                        </div>
                    </div>
                    <div className="flex space-x-2 self-end sm:self-center flex-shrink-0 mt-2 sm:mt-0"><Button variant="outline" size="sm" onClick={() => handleEditItem(post as AllListItems, 'blog')} className="text-blue-600 border-blue-300 hover:bg-blue-50"><Edit className="h-4 w-4 mr-1"/> Edit</Button><Button variant="destructive" size="sm" onClick={() => handleDeleteItem(post._id, 'blog post', '/blogs', fetchBlogPosts)} className="bg-red-500 hover:bg-red-600"><Trash2 className="h-4 w-4 mr-1"/> Delete</Button></div>
                </li>
                )})}</ul>)}
            </div>
          </motion.section> )}
      </div>

        {/* Episode Management Modal */}
        {isEpisodeModalOpen && currentManagingSeries && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
                    <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10">
                        <h3 className="text-xl font-semibold text-gray-900">Manage Episodes for: <span className="text-pink-600">{currentManagingSeries.title}</span></h3>
                        <Button variant="ghost" size="icon" onClick={() => setIsEpisodeModalOpen(false)} className="text-gray-500 hover:text-gray-800"><X size={24} /></Button>
                    </div>

                    <div className="p-6 overflow-y-auto space-y-8">
                        {/* Add/Edit Episode Form */}
                        <section id="podcastEpisode-form-section">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-lg font-semibold text-gray-700">{isEditingPodcastEpisode ? 'Edit Episode' : 'Add New Episode'}</h4>
                                {isEditingPodcastEpisode && (<Button variant="outline" size="sm" onClick={() => handleAddNew('podcastEpisode')}><PlusCircle className="h-4 w-4 mr-2" /> Add New Episode</Button>)}
                            </div>
                             {episodeModalSuccess && <div className="mb-4 p-3 rounded-md bg-green-50 text-green-700 flex items-center"><CheckCircle className="h-5 w-5 mr-2"/> {episodeModalSuccess}</div>}
                            {episodeModalError && <div className="mb-4 p-3 rounded-md bg-red-50 text-red-700 flex items-center"><AlertCircle className="h-5 w-5 mr-2"/> {episodeModalError}</div>}
                            <form onSubmit={handlePodcastEpisodeSubmit} className="space-y-4">
                                <div><label htmlFor="title-episode" className={LABEL_CLASS}>Episode Title <span className="text-red-500">*</span></label><div className="relative"><Type className={`${ICON_CLASS} absolute left-3 top-1/2 -translate-y-1/2`}/><Input type="text" name="title" id="title-episode" value={podcastEpisodeFormData.title} onChange={(e) => handleInputChange(e, 'podcastEpisode')} required className={INPUT_CLASS}/></div></div>
                                {renderFileInput("thumbnail-episode", "Episode Thumbnail", podcastEpisodeThumbnailRef, handlePodcastEpisodeThumbnailChange, podcastEpisodeThumbnailPreview, false, true, isEditingPodcastEpisode)} {/* context removed */}
                                <div><label htmlFor="description-episode" className={LABEL_CLASS}>Description <span className="text-red-500">*</span></label><div className="relative"><FileText className={`${ICON_CLASS} absolute left-3 top-3`}/><Textarea name="description" id="description-episode" value={podcastEpisodeFormData.description} onChange={(e) => handleInputChange(e, 'podcastEpisode')} rows={3} required className={TEXTAREA_CLASS_NAME}></Textarea></div></div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div><label htmlFor="episodeNumber-episode" className={LABEL_CLASS}>Episode No. <span className="text-red-500">*</span></label><div className="relative"><Hash className={`${ICON_CLASS} absolute left-3 top-1/2 -translate-y-1/2`}/><Input type="number" name="episodeNumber" id="episodeNumber-episode" value={podcastEpisodeFormData.episodeNumber} onChange={(e) => handleInputChange(e, 'podcastEpisode')} required className={INPUT_CLASS} min="1"/></div></div>
                                    <div><label htmlFor="duration-episode" className={LABEL_CLASS}>Duration (e.g., 35 min) <span className="text-red-500">*</span></label><div className="relative"><Clock className={`${ICON_CLASS} absolute left-3 top-1/2 -translate-y-1/2`}/><Input type="text" name="duration" id="duration-episode" value={podcastEpisodeFormData.duration} onChange={(e) => handleInputChange(e, 'podcastEpisode')} required className={INPUT_CLASS}/></div></div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div><label htmlFor="youtubeLink-episode" className={LABEL_CLASS}>YouTube Link <span className="text-red-500">*</span></label><div className="relative"><Youtube className={`${ICON_CLASS} absolute left-3 top-1/2 -translate-y-1/2`}/><Input type="url" name="youtubeLink" id="youtubeLink-episode" value={podcastEpisodeFormData.youtubeLink} onChange={(e) => handleInputChange(e, 'podcastEpisode')} required className={INPUT_CLASS}/></div></div>
                                    <div><label htmlFor="publishDate-episode" className={LABEL_CLASS}>Publish Date</label><div className="relative"><CalendarDays className={`${ICON_CLASS} absolute left-3 top-1/2 -translate-y-1/2`}/><Input type="date" name="publishDate" id="publishDate-episode" value={podcastEpisodeFormData.publishDate} onChange={(e) => handleInputChange(e, 'podcastEpisode')} className={INPUT_CLASS}/></div></div>
                                </div>
                                <div className="pt-2"><Button type="submit" disabled={episodeLoading} className={SUBMIT_BUTTON_CLASS}> {episodeLoading ? <Loader2 className="animate-spin mr-2 h-5 w-5"/> : <PlusCircle className="h-5 w-5 mr-2" />}{isEditingPodcastEpisode ? 'Update Episode' : 'Add Episode'} </Button></div>
                            </form>
                        </section>

                        <section>
                           {renderItemList<PodcastEpisodeListItem>(
                                podcastEpisodeList, 
                                'podcastEpisode', 
                                (item) => handleEditPodcastEpisode(item), 
                                (id) => handleDeletePodcastEpisode(id), 
                                () => { if(currentManagingSeries) fetchPodcastEpisodesForSeries(currentManagingSeries._id); },
                                undefined
                            )}
                        </section>
                    </div>
                </div>
            </motion.div>
        )}
    </motion.div>
  );
}