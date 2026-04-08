import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../utils/AppContext';
import languagePack from '../utils/language';

export default function VoiceAssistant() {
  const { language } = useAppContext();
  const t = language === "en" ? languagePack.EN : languagePack.TN;
  
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [response, setResponse] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState('');
  const [showAssistant, setShowAssistant] = useState(false);
  
  const recognitionRef = useRef(null);
  const synthesisRef = useRef(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = language === 'en' ? 'en-BW' : 'tn-BW';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setError('');
      };

      recognitionRef.current.onresult = (event) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        processVoiceCommand(text);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setError(language === 'en' 
          ? `Speech recognition error: ${event.error}`
          : `Phoso ya temogo ya puo: ${event.error}`
        );
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      setError(language === 'en' 
        ? 'Speech recognition not supported in your browser'
        : 'Temogo ya puo ga e tshegetshege mo sebatli sa gago'
      );
    }

    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      synthesisRef.current = window.speechSynthesis;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthesisRef.current && synthesisRef.current.speaking) {
        synthesisRef.current.cancel();
      }
      // Also stop any ongoing speech
      window.speechSynthesis && window.speechSynthesis.cancel();
    };
  }, [language]);

  const processVoiceCommand = (command) => {
    setIsProcessing(true);
    setResponse('');
    
    // Simulate processing delay
    setTimeout(() => {
      const processedResponse = generateVoiceResponse(command.toLowerCase());
      setResponse(processedResponse);
      speakResponse(processedResponse);
      setIsProcessing(false);
    }, 1500);
  };

  const generateVoiceResponse = (command) => {
    const emergencyKeywords = language === 'en' 
      ? ['emergency', 'ambulance', 'help', 'accident', 'urgent', '911', '997']
      : ['tšhogo', 'ambalese', 'thušo', 'kotsi', 'ka potlako', '911', '997'];
    
    const hospitalKeywords = language === 'en'
      ? ['hospital', 'clinic', 'doctor', 'medical', 'health center', 'facility']
      : ['bedele', 'kliniki', 'ngaka', 'bophelo', 'setara sa bophelo', 'lefelo'];
    
    const hivKeywords = language === 'en'
      ? ['hiv', 'aids', 'testing', 'arv', 'treatment', 'test']
      : ['hiv', 'aids', 'teko', 'arv', 'kalafo', 'teko'];

    const vaccineKeywords = language === 'en'
      ? ['vaccine', 'vaccination', 'immunization', 'shot']
      : ['entšhetšwapelo', 'go entšhetšwa', 'tshireletso', 'entšhetšo'];

    const mentalHealthKeywords = language === 'en'
      ? ['mental', 'counseling', 'therapy', 'psychologist', 'depression']
      : ['monagano', 'keletšo', 'therapi', 'pshichologist', 'kutlwelo'];

    // Emergency response
    if (emergencyKeywords.some(keyword => command.includes(keyword))) {
      return language === 'en'
        ? "Emergency contacts: Ambulance 997, Police 911, Fire 998. For immediate assistance, please call these numbers directly. Mental health crisis line: 0800 600 200"
        : "Dikgolagano tša tšhogo: Ambalese 997, Mapodisi 911, Mello 998. Go thuso e e potlako, ka kopo bitsa dinomoro tše ka nepagetsho. Laeine ya kgapeletšo ya bophelo bja monagano: 0800 600 200";
    }
    
    // Hospital response
    if (hospitalKeywords.some(keyword => command.includes(keyword))) {
      return language === 'en'
        ? "I can help you find hospitals and clinics. There are several health facilities across Botswana including Princess Marina Hospital in Gaborone, Nyangabgwe Hospital in Francistown, and Scottish Livingstone Hospital in Molepolole."
        : "Nka go thusa go fumana dibedele le dikliniki. Go na le mafelo a mantši a bophelo kua Botswana go akaretswa Princess Marina Hospital kua Gaborone, Nyangabgwe Hospital kua Francistown, le Scottish Livingstone Hospital kua Molepolole.";
    }
    
    // HIV response
    if (hivKeywords.some(keyword => command.includes(keyword))) {
      return language === 'en'
        ? "HIV testing and treatment services are available at all public health facilities in Botswana. Services are confidential and free at government clinics. ARV treatment is also available nationwide."
        : "Ditirelo tša diteko tša HIV le kalafo di a gona mafelong otlhe a bophelo a mmušo kua Botswana. Ditirelo ga di bolelelwe mme di a lokolwa dikliniking tša mmušo. Kalafo ya ARV le yona e a gona mo nageng yotlhe.";
    }

    // Vaccine response
    if (vaccineKeywords.some(keyword => command.includes(keyword))) {
      return language === 'en'
        ? "Vaccination services are available at all government health facilities. Common vaccines include COVID-19, measles, polio, and routine childhood immunizations. Services are free at public clinics."
        : "Ditirelo tša go entšhetšwa di a gona mafelong otlhe a bophelo a mmušo. Dientšhetšwapelo tša mehutahuta di akaretša COVID-19, measles, polio, le dientšhetšwapelo tša mehuta ya bana. Ditirelo di a lokolwa dikliniking tša mmušo.";
    }

    // Mental health response
    if (mentalHealthKeywords.some(keyword => command.includes(keyword))) {
      return language === 'en'
        ? "Mental health support is available through the national mental health crisis line at 0800 600 200. Counseling services and psychological support are available at district hospitals and some clinics."
        : "Thekgo ya bophelo bja monagano e a gona ka laeine ya kgapeletšo ya bophelo bja monagano ya naga ka 0800 600 200. Ditirelo tša keletšo le thekgo ya monagano di a gona dibedeleng tša kgaolo le dikliniking tše dingwe.";
    }
    
    // Greeting response
    if (command.includes('hello') || command.includes('hi') || command.includes('dumela')) {
      return language === 'en'
        ? "Hello! I'm your health voice assistant. I can help you find information about hospitals, emergency contacts, HIV services, vaccinations, and mental health support in Botswana. What would you like to know?"
        : "Dumela! Ke motsaedi wa gago wa puo ya bophelo. Nka go thusa go fumana tshedimosetso ka mabapi le dibedele, dikgolagano tša tšhogo, ditirelo tša HIV, dientšhetšwapelo, le thekgo ya bophelo bja monagano mo Botswana. O batla go itse eng?";
    }
    
    // Thank you response
    if (command.includes('thank') || command.includes('thanks') || command.includes('ke a leboga')) {
      return language === 'en'
        ? "You're welcome! Is there anything else I can help you with regarding healthcare services in Botswana?"
        : "O amogelesegile! Go na le se sengwe se nka se thusa ka sona mabapi le ditirelo tša tshireletso ya bophelo mo Botswana?";
    }

    // Default response
    return language === 'en'
      ? "I understand you're asking about healthcare in Botswana. For specific information, try asking about hospitals, emergency contacts, HIV testing, vaccinations, or mental health services. Please speak clearly and try again."
      : "Ke a kweša o botša ka tshireletso ya bophelo mo Botswana. Bakeng sa tshedimosetso e e nepagetsheng, lekgosa go botša ka dibedele, dikgolagano tša tšhogo, diteko tša HIV, dientšhetšwapelo, kgo ditirelo tša bophelo bja monagano. Ka kopo bua ka tesla e e hlakileng mme o leke gape.";
  };

  const speakResponse = (text) => {
    if (!synthesisRef.current) return;

    // Check if already speaking
    if (synthesisRef.current.speaking) {
      synthesisRef.current.cancel();
    }

    setIsSpeaking(true);
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'en' ? 'en-BW' : 'tn-BW';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    utterance.onstart = () => {
      setIsSpeaking(true);
    };
    
    utterance.onend = () => {
      setIsSpeaking(false);
    };
    
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
      setError(language === 'en' 
        ? 'Speech synthesis failed'
        : 'Go dira puo ga go atlege'
      );
    };

    synthesisRef.current.speak(utterance);
  };

  const startListening = () => {
    setError('');
    setTranscript('');
    setResponse('');
    
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        setError(language === 'en' 
          ? 'Failed to start voice recognition. Please check your microphone permissions.'
          : 'Go thoma temogo ya puo ga go atlege. Ka kopo lekola ditshenyegelo tša mikrophouno ya gago.'
        );
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const stopSpeaking = () => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
    }
    setIsSpeaking(false);
  };

  const toggleAssistant = () => {
    setShowAssistant(!showAssistant);
    setError('');
    setTranscript('');
    setResponse('');
    
    if (isSpeaking) {
      stopSpeaking();
    }
    if (isListening) {
      stopListening();
    }
  };

  return (
    <div className="voice-assistant">
      {/* Floating Button - Always show when window is closed */}
      <button 
        className="voice-floating-btn"
        onClick={toggleAssistant}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            toggleAssistant();
          }
        }}
        aria-label={language === 'en' ? 'Open voice assistant' : 'Bula motsaedi wa puo'}
        style={{ display: showAssistant ? 'none' : 'flex' }}
      >
        {/* Inline SVG used instead of emoji for consistent rendering across platforms */}
        <svg className="voice-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true">
          <path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 14 0h-2z" fill="currentColor" />
          <path d="M19 11v1a7 7 0 0 1-14 0v-1H3v1a9 9 0 0 0 8 8.94V22h2v-1.06A9 9 0 0 0 21 12v-1h-2z" fill="currentColor" opacity="0.0"/>
        </svg>
      </button>

      {/* Assistant Window */}
      {showAssistant && (
        <div className="voice-window">
          <header className="voice-header">
            <div className="voice-title">
              <strong>🎤 {language === 'en' ? 'Voice Assistant' : 'Motsaedi wa Puo'}</strong>
              <span className="voice-status">
                {language === 'en' ? 'Ready to help' : 'E a siama go thusa'}
              </span>
            </div>
            <button 
              onClick={toggleAssistant}
              className="voice-close-btn"
              aria-label={language === 'en' ? 'Close voice assistant' : 'Tswalela motsaedi wa puo'}
            >
              ✕
            </button>
          </header>

          <div className="voice-body">
            {/* Error Display */}
            {error && (
              <div className="voice-error">
                ⚠️ {error}
              </div>
            )}

            {/* Transcript Display */}
            {transcript && (
              <div className="voice-transcript">
                <strong>{language === 'en' ? 'You said:' : 'O itše:'}</strong>
                <p>"{transcript}"</p>
              </div>
            )}

            {/* Processing Indicator */}
            {isProcessing && (
              <div className="voice-processing">
                <div className="processing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <p>{language === 'en' ? 'Processing your request...' : 'Go bea kopo ya gago...'}</p>
              </div>
            )}

            {/* Response Display */}
            {response && (
              <div className="voice-response">
                <strong>{language === 'en' ? 'Response:' : 'Araba:'}</strong>
                <p>"{response}"</p>
              </div>
            )}

            {/* Instructions */}
            <div className="voice-instructions">
              <h4>{language === 'en' ? 'Try saying:' : 'Lekgosa go re:'}</h4>
              <ul>
                {language === 'en' ? (
                  <>
                    <li>"Emergency contacts"</li>
                    <li>"Find hospitals near me"</li>
                    <li>"HIV testing services"</li>
                    <li>"Vaccination centers"</li>
                    <li>"Mental health support"</li>
                  </>
                ) : (
                  <>
                    <li>"Dikgolagano tša tšhogo"</li>
                    <li>"Fumana dibedele gaufi le nna"</li>
                    <li>"Ditirelo tša diteko tša HIV"</li>
                    <li>"Mafelo a go entšhetšwa"</li>
                    <li>"Thekgo ya bophelo bja monagano"</li>
                  </>
                )}
              </ul>
            </div>
          </div>

          <div className="voice-controls">
            {/* Listen Button */}
            <button
              onClick={isListening ? stopListening : startListening}
              disabled={isProcessing || isSpeaking}
              className={`voice-action-btn ${isListening ? 'listening' : ''}`}
            >
              {isListening ? (
                <>
                  <div className="pulse-ring"></div>
                  🔴 {language === 'en' ? 'Listening...' : 'Go reetsa...'}
                </>
              ) : (
                <>
                  <svg className="voice-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true">
                    <path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3z" fill="currentColor" />
                  </svg>
                  {language === 'en' ? 'Start Speaking' : 'Thoma go Bua'}
                </>
              )}
            </button>

            {/* Stop Speaking Button */}
            {isSpeaking && (
              <button
                onClick={stopSpeaking}
                className="voice-action-btn stop"
              >
                ⏹️ {language === 'en' ? 'Stop Speaking' : 'Emisa go Bua'}
              </button>
            )}
          </div>

          <div className="voice-footer">
            <p className="voice-note">
              {language === 'en' 
                ? 'Note: Voice recognition works best in quiet environments with a good microphone'
                : 'Tlhahlo: Temogo ya puo e šoma gabotse mo maemong a a khutsafetseng ka mikrophouno e e siameng'
              }
            </p>
          </div>
        </div>
      )}
    </div>
  );
}