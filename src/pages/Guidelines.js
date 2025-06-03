import {
  Box,
  Container,
  Heading,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  List,
  ListItem,
  ListIcon,
  Alert,
  AlertIcon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
  Button,
  Radio,
  RadioGroup,
  Stack,
  Icon,
  Divider,
  Badge,
  useDisclosure,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import { useState } from 'react'
import { MdCheckCircle, MdWarning, MdPlayArrow, MdDownload, MdExpandMore, MdSearch } from 'react-icons/md'
import { FaVideo, FaFileDownload } from 'react-icons/fa'
import { BsDropletFill } from 'react-icons/bs'

function Guidelines() {
  const [showDetails, setShowDetails] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [submittedAnswers, setSubmittedAnswers] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const handleQuizAnswer = (questionIndex, answer) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const handleSubmitAnswer = (questionIndex) => {
    setSubmittedAnswers(prev => ({
      ...prev,
      [questionIndex]: true
    }));
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const guidelines = [
    {
      title: 'CPR (Cardiopulmonary Resuscitation)',
      content: {
        emergency: {
          title: 'If someone is unresponsive and not breathing normally:',
          steps: [
            'Call ambulance (or yell for someone to call)',
            'Start Hands-Only CPR: Push hard and fast on the center of the chest',
            'Maintain rate: 100-120 compressions per minute (beat of "Stayin\' Alive")',
            'Don\'t stop until: Help arrives, AED is available, or person starts breathing'
          ]
        },
        detailedSteps: {
          title: '📝 Detailed CPR Instructions',
          sections: [
            {
              subtitle: '1. Check the Scene & Victim',
              steps: [
                'Safe? Ensure area is safe for you and victim',
                'Responsive? Tap shoulders, shout "Are you OK?"',
                'Breathing? Look for chest movement (5-10 seconds)',
                'If NO breathing or only gasping → BEGIN CPR'
              ]
            },
            {
              subtitle: '2. Hands-Only CPR (For Adults & Teens)',
              steps: [
                'Position hands: Heel of one hand on center of chest (between nipples)',
                'Interlock fingers: Second hand on top, elbows locked straight',
                'Push hard & fast:',
                '- Depth: 2 inches (5 cm)',
                '- Rate: 100-120 compressions/min',
                '- Let chest fully recoil between pushes',
                'Continue until:',
                '- AED arrives',
                '- EMS takes over',
                '- Victim starts moving'
              ]
            },
            {
              subtitle: '3. Child CPR (1yr - Puberty)',
              steps: [
                'Use one or two hands (depending on child\'s size)',
                'Shallower compressions: About 2 inches deep',
                'Optional: Give 2 rescue breaths after 30 compressions (if trained)'
              ]
            },
            {
              subtitle: '4. Infant CPR (<1 year old)',
              steps: [
                'Two fingers (middle & ring) just below nipple line',
                'Depth: 1.5 inches (4 cm)',
                '30 compressions : 2 gentle breaths (cover mouth AND nose)'
              ]
            }
          ]
        },
        warnings: {
          title: '⚠️ Critical CPR Don\'ts',
          items: [
            'Don\'t bend elbows (keep arms straight)',
            'Don\'t "bounce" compressions (full chest recoil is vital)',
            'Don\'t delay CPR to find perfect hand position'
          ]
        },
        videos: {
          title: '🎥 Video Demonstrations',
          links: [
            { title: 'American Heart Association: Hands-Only CPR', url: '#' },
            { title: 'Infant CPR - Red Cross', url: '#' }
          ]
        },
        quiz: {
          title: '❓ CPR Knowledge Quiz',
          questions: [
            {
              question: 'What\'s the correct compression rate?',
              options: [
                '60-80 per minute',
                '100-120 per minute',
                'As fast as possible'
              ],
              correctAnswer: '100-120 per minute'
            },
            {
              question: 'True or False: You should stop compressions to check for breathing',
              answer: 'False (Only stop if victim wakes up or help arrives)'
            }
          ]
        },
        mistakes: {
          title: '⚠️ Critical CPR Don\'ts',
          items: [
            'Don\'t bend elbows (keep arms straight)',
            'Don\'t "bounce" compressions (full chest recoil is vital)',
            'Don\'t delay CPR to find perfect hand position'
          ]
        },
        tips: {
          title: '💡 CPR Success Tips',
          items: [
            'Push hard enough to feel ribs flex',
            'Switch rescuers every 2 minutes to avoid fatigue',
            'If untrained, hands-only CPR is better than nothing!',
            '🎵 Pro Tip: Compress to the beat of "Stayin\' Alive" (Bee Gees) or "Crazy in Love" (Beyoncé)'
          ]
        }
      }
    },
    {
      title: 'Bleeding Control',
      content: {
        emergency: {
          title: 'For life-threatening bleeding (bright red, spurting blood, or pooling blood):',
          steps: [
            'Call 911 (or tell someone to call)',
            'Use both hands to apply direct pressure on the wound with a clean cloth',
            'If blood soaks through, DO NOT remove - add more layers',
            'Elevate (if possible) above heart level',
            'Add a Bandage once bleeding slows'
          ]
        },
        tourniquet: {
          title: '🚨 Tourniquet Use (For Arm/Leg Bleeding Only):',
          steps: [
            'Apply 2-3 inches above wound (never on joints)',
            'Tighten until bleeding stops',
            'Write time applied (use marker or blood)'
          ]
        },
        detailedSteps: {
          title: '📝 Detailed Bleeding Control Steps',
          sections: [
            {
              subtitle: '1. Minor Cuts & Scrapes',
              steps: [
                'Wash with clean water',
                'Apply antibiotic ointment',
                'Cover with sterile bandage'
              ]
            },
            {
              subtitle: '2. Severe Bleeding (Uncontrolled)',
              table: {
                headers: ['Technique', 'When to Use', 'How to Do It'],
                rows: [
                  ['Direct Pressure', 'Most wounds', 'Push firmly with palm + clean cloth'],
                  ['Pressure Points', 'If direct pressure fails', 'Press artery against bone (e.g., brachial artery)'],
                  ['Tourniquet', 'Limb wounds only', 'Use commercial tourniquet or improvised belt']
                ]
              }
            }
          ]
        },
        warnings: {
          title: '⚠️ Never Remove:',
          items: [
            'Embedded objects (stabilize with bulky dressing)',
            'Blood-soaked dressings (add new layers on top)'
          ]
        },
        videos: {
          title: '🎥 Video Demonstrations',
          links: [
            { title: 'Stop the Bleed: Tourniquet Application', url: '#' },
            { title: 'Direct Pressure Technique - Red Cross', url: '#' }
          ]
        },
        quiz: {
          title: '❓ Bleeding Control Quiz',
          questions: [
            {
              question: 'What should you do if blood soaks through a bandage?',
              options: [
                'Remove it and replace',
                'Add more layers on top',
                'Pour water on it'
              ],
              correctAnswer: 'Add more layers on top'
            },
            {
              question: 'True or False: You can use a belt as a tourniquet',
              answer: 'True (But prefer commercial tourniquets)'
            }
          ]
        },
        mistakes: {
          title: '⚠️ Critical Mistakes to Avoid',
          items: [
            'Don\'t use tourniquets on neck/torso',
            'Don\'t use hydrogen peroxide on deep wounds',
            'Don\'t lift dressings to check bleeding'
          ]
        },
        tips: {
          title: '💡 Pro Tips',
          items: [
            'Keep hemostatic gauze in first aid kits',
            'Wear gloves to protect from bloodborne pathogens',
            'For nosebleeds: Pinch soft part of nose + lean forward'
          ]
        }
      }
    },
    {
      title: 'Choking Response',
      content: {
        emergency: {
          title: 'If someone is choking:',
          steps: [
            'Ask: "Are you choking? Can you speak?"',
            'If they can cough or speak, let them keep coughing',
            'If they can\'t breathe, speak, or cough, act fast',
            'For Adults/Children (Over 1 year old): Perform the Heimlich Maneuver',
            'For Infants (Under 1 year old): Use back blows + chest thrusts (never Heimlich)',
            'If the person becomes unconscious: Start CPR and call ambulance'
          ]
        },
        detailedSteps: {
          title: '📝 Detailed Choking Rescue Steps',
          sections: [
            {
              subtitle: '1. For Adults & Children (Over 1 Year Old)',
              steps: [
                'Heimlich Maneuver (Conscious Victim):',
                '- Stand behind them, wrap arms around their waist',
                '- Make a fist, place it above the navel, below the ribs',
                '- Grasp your fist with your other hand, thrust upward and inward sharply',
                '- Repeat until the object is coughed up OR they become unconscious',
                '',
                'If the Victim Passes Out:',
                '- Call ambulance immediately',
                '- Start CPR (check mouth for obstructions between compressions)'
              ]
            },
            {
              subtitle: '2. For Infants (Under 1 Year Old)',
              steps: [
                'Back Blows + Chest Thrusts:',
                '- Hold the baby face-down on your forearm (support head/jaw)',
                '- Give 5 back blows between shoulder blades with heel of hand',
                '- Flip baby face-up, give 5 chest thrusts (two fingers on breastbone)',
                '- Repeat until object is out OR baby becomes unresponsive',
                '',
                'If Baby Stops Breathing:',
                '- Shout for help, call ambulance',
                '- Start infant CPR (30 compressions : 2 breaths)'
              ]
            }
          ]
        },
        warnings: {
          title: '🚑 When to Seek Emergency Help',
          items: [
            'The person loses consciousness',
            'The object isn\'t dislodged after 5+ thrusts',
            'They have trouble breathing afterward (possible injury)'
          ]
        },
        videos: {
          title: '🎥 Visual Aid: Choking Rescue Videos',
          links: [
            { title: 'Adult/Child Choking: American Red Cross Heimlich Maneuver', url: '#' },
            { title: 'Infant Choking: St. John Ambulance Infant Demo', url: '#' }
          ]
        },
        quiz: {
          title: '❓ Test Your Knowledge',
          questions: [
            {
              question: 'Where do you place your hands for the Heimlich maneuver?',
              options: [
                'On the ribs',
                'Above the navel, below the ribs',
                'On the chest'
              ],
              correctAnswer: 'Above the navel, below the ribs'
            },
            {
              question: 'True or False: You should use the Heimlich on an infant',
              answer: 'False (Use back blows + chest thrusts only!)'
            }
          ]
        },
        mistakes: {
          title: '⚠️ Critical "Do Not" Tips',
          items: [
            'Don\'t slap the victim\'s back if they\'re upright (may push object deeper)',
            'Don\'t finger-sweep the mouth (unless you see the object clearly)',
            'Don\'t give water/food until choking is fully resolved'
          ]
        },
        tips: {
          title: '💡 Pro Tips for Prevention',
          items: [
            'Cut food into small pieces for kids/elderly',
            'Avoid giving hard candies, nuts, or grapes to toddlers',
            'Learn CPR to handle worst-case scenarios'
          ]
        }
      }
    },
    {
      title: 'Burns Treatment',
      content: {
        emergency: {
          title: 'If someone gets burned:',
          steps: [
            'Stop the burning process (remove heat/electricity/chemicals)',
            'Cool the burn under cool (not icy) running water for 10–15 mins',
            'Remove tight clothing/jewelry (before swelling starts)',
            'Cover loosely with a sterile, non-stick bandage or clean cloth',
            'Do NOT use ice, butter, or ointments (can worsen damage)'
          ]
        },
        detailedSteps: {
          title: '📝 Detailed Burn Treatment Guide',
          sections: [
            {
              subtitle: '1. Types of Burns & Severity',
              table: {
                headers: ['Degree', 'Symptoms', 'Action'],
                rows: [
                  ['First-Degree (Superficial)', 'Red, painful, no blisters (e.g., sunburn)', 'Treat at home'],
                  ['Second-Degree (Partial Thickness)', 'Blisters, swelling, wet-looking', 'Medical care if large'],
                  ['Third-Degree (Full Thickness)', 'White/black leathery skin, no pain (nerve damage)', 'Call ambulance']
                ]
              }
            },
            {
              subtitle: '2. Step-by-Step First Aid',
              steps: [
                'A. Thermal Burns (Heat/Fire):',
                'Cool the Burn:',
                '- Hold under cool running water (10–15 mins)',
                '- Avoid ice (can cause frostbite)',
                '',
                'Protect the Burn:',
                '- Cover with clean cloth or gauze (no fluffy cotton)',
                '',
                'Pain Relief:',
                '- Give paracetamol/ibuprofen (if needed)',
                '',
                'B. Chemical Burns:',
                'Rinse Immediately:',
                '- Flood with water for 15–20 mins',
                '- Remove contaminated clothing carefully',
                '- Check the Chemical\'s Label (e.g., acid/alkali—some need special treatment)',
                '',
                'C. Electrical Burns:',
                '- Turn Off Power Source FIRST (or use a wooden stick to move the victim)',
                '- Check for Breathing/CPR (electricity can stop the heart)'
              ]
            },
            {
              subtitle: '3. What NOT to Do',
              steps: [
                '❌ Pop blisters (increases infection risk)',
                '❌ Apply butter, oil, or toothpaste (traps heat)',
                '❌ Use adhesive bandages (can stick to the burn)'
              ]
            }
          ]
        },
        warnings: {
          title: '🚨 Seek emergency help if:',
          items: [
            'The burn is larger than your palm',
            'It\'s on the face, hands, feet, or genitals',
            'The skin looks charred (white/brown/black) or blistered badly',
            'The victim is a baby/elderly or has trouble breathing',
            'Signs of infection (pus, fever, swelling) appear later'
          ]
        },
        videos: {
          title: '🎥 Visual Aid',
          links: [
            { title: 'How to Treat Burns – British Red Cross', url: '#' }
          ]
        },
        quiz: {
          title: '❓ Test Your Knowledge',
          questions: [
            {
              question: 'How long should you cool a burn under water?',
              options: [
                '2 mins',
                '10–15 mins',
                '30 mins'
              ],
              correctAnswer: '10–15 mins'
            },
            {
              question: 'True or False: You should put butter on a burn',
              answer: 'False (Butter traps heat and worsens damage!)'
            }
          ]
        },
        mistakes: {
          title: '3. What NOT to Do',
          items: [
            'Pop blisters (increases infection risk)',
            'Apply butter, oil, or toothpaste (traps heat)',
            'Use adhesive bandages (can stick to the burn)',
            'Use ice (can cause frostbite)',
            'Delay seeking medical help for serious burns'
          ]
        },
        tips: {
          title: '💡 Pro Tip:',
          items: [
            'Keep a burn first aid kit with:',
            '- Sterile gauze pads',
            '- Non-stick bandages (e.g., Telfa)',
            '- Saline solution (for rinsing chemicals)'
          ]
        }
      }
    },
    {
      title: 'Seizure Response',
      content: {
        emergency: {
          title: 'When someone is having a convulsive seizure (full-body shaking):',
          steps: [
            'Stay Calm - Most seizures stop within 1-3 minutes',
            'Time It - Note when seizure starts',
            'Protect Them: Cushion head (use jacket/towel)',
            'Move hard objects away',
            'Roll Them onto their side (recovery position) once shaking stops',
            'Stay With Them until fully awake'
          ]
        },
        detailedSteps: {
          title: '📝 Detailed Seizure Response',
          sections: [
            {
              subtitle: '1. During the Seizure (Tonic-Clonic)',
              steps: [
                '✅ Do:',
                '- Clear space around them',
                '- Loosen tight clothing (especially neck)',
                '- Time the seizure',
                '',
                '❌ Don\'t:',
                '- Hold them down',
                '- Put anything in mouth',
                '- Give water/food until fully alert'
              ]
            },
            {
              subtitle: '2. After the Seizure (Postictal Phase)',
              steps: [
                'Keep on side (prevents choking)',
                'Wipe away saliva gently',
                'Speak calmly - confusion is normal',
                'Explain what happened'
              ]
            },
            {
              subtitle: '3. Non-Convulsive Seizures (Absence/Focal)',
              steps: [
                'May appear "zoned out"',
                'Guide gently away from danger',
                'Don\'t restrain - stay with them'
              ]
            },
            {
              subtitle: '4. Special Situations',
              steps: [
                'Water Rescue:',
                '- Support head above water',
                '- Call ambulance even if brief',
                '',
                'Wheelchair Users:',
                '- Lock wheels',
                '- Support head unless harnessed'
              ]
            }
          ]
        },
        warnings: {
          title: '🚨 Call ambulance IF:',
          items: [
            'Seizure lasts >5 minutes',
            'Second seizure occurs',
            'Difficulty breathing after',
            'Injury occurs',
            'Happens in water',
            'Person is pregnant/diabetic'
          ]
        },
        videos: {
          title: '🎥 Video Demonstrations',
          links: [
            { title: 'Epilepsy Foundation: Seizure First Aid', url: '#' },
            { title: 'Recovery Position Technique', url: '#' }
          ]
        },
        quiz: {
          title: '❓ Seizure Knowledge Quiz',
          questions: [
            {
              question: 'Should you put something in a seizing person\'s mouth?',
              answer: 'No (Risk of choking/injury)'
            },
            {
              question: 'The recovery position helps:',
              options: [
                'Stop the seizure faster',
                'Keep airways clear',
                'Make them wake up sooner'
              ],
              correctAnswer: 'Keep airways clear'
            }
          ]
        },
        mistakes: {
          title: '⚠️ Critical Mistakes to Avoid',
          items: [
            'Don\'t try to stop their movements',
            'Don\'t put anything in their mouth',
            'Don\'t try to move them during the seizure',
            'Don\'t give food or drink until fully alert',
            'Don\'t leave them alone until recovered'
          ]
        },
        tips: {
          title: '💡 Key Safety Tips',
          items: [
            'Pillow under head prevents injury',
            'Remove glasses if worn',
            'Note triggers (flashing lights, stress, illness) if known',
            'Time the seizure if possible',
            'Stay calm and reassuring'
          ]
        }
      }
    },
    {
      title: 'Fracture & Sprain',
      content: {
        emergency: {
          title: 'Emergency Response Steps:',
          steps: [
            'For Suspected FRACTURE:',
            '- Stop all movement to prevent further injury',
            '- Call ambulance if: bone visible, head/neck/back injury, or limb is blue/cold',
            '- Stabilize/splint the injury if trained',
            '- Apply ice (wrapped in cloth) for swelling',
            '',
            'For SPRAINS (R.I.C.E Method):',
            '- Rest: Stop activity immediately',
            '- Ice: Apply 20 minutes on/off',
            '- Compression: Use elastic bandage (not too tight)',
            '- Elevation: Keep injured area above heart level'
          ]
        },
        detailedSteps: {
          title: '📝 Detailed Treatment Guide',
          sections: [
            {
              subtitle: '1. Splinting Techniques',
              table: {
                headers: ['Injury Location', 'Improvised Splint Materials', 'Key Tips'],
                rows: [
                  ['Arm', 'Rolled newspaper, cardboard', 'Support elbow/wrist'],
                  ['Leg', 'Umbrella, broom handle', 'Pad between legs'],
                  ['Finger', 'Popsicle stick, pen', 'Tape to adjacent finger']
                ]
              }
            },
            {
              subtitle: '2. Golden Rules for Splinting',
              steps: [
                'Splint above and below injury point',
                'Check circulation after tightening (press nail beds)',
                'Never attempt to realign bones',
                'Pad splints for comfort'
              ]
            },
            {
              subtitle: '3. Open Fracture Care',
              steps: [
                'Cover wound with sterile dressing',
                'Apply pressure around (not on) protruding bone',
                'Stabilize without pushing bone back in',
                'Keep victim still and calm'
              ]
            },
            {
              subtitle: '4. Sprain Assessment',
              steps: [
                'Grade 1: Mild stretch, minimal swelling',
                'Grade 2: Partial tear, moderate swelling',
                'Grade 3: Complete tear, severe swelling',
                'When in doubt, treat as fracture'
              ]
            }
          ]
        },
        warnings: {
          title: '⚠️ Seek Emergency Help IMMEDIATELY if:',
          items: [
            'Bone is visible through skin',
            'Injury involves head, neck, or spine',
            'Limb appears blue or feels cold',
            'Severe pain or inability to move',
            'Numbness or tingling below injury'
          ]
        },
        videos: {
          title: '🎥 Video Demonstrations',
          links: [
            { title: 'How to Splint a Fracture - Red Cross', url: '#' },
            { title: 'R.I.C.E. Method for Sprains', url: '#' }
          ]
        },
        quiz: {
          title: '❓ Injury Knowledge Quiz',
          questions: [
            {
              question: 'What\'s the first step for a suspected broken leg?',
              options: [
                'Massage the area',
                'Immobilize the leg',
                'Try to walk on it'
              ],
              correctAnswer: 'Immobilize the leg'
            },
            {
              question: 'True or False: You should apply heat immediately to sprains',
              answer: 'False (Ice first 48 hours)'
            }
          ]
        },
        mistakes: {
          title: '⚠️ Critical Mistakes to Avoid',
          items: [
            'Moving injured person unnecessarily (except from danger)',
            'Tightening splint/bandage until numb',
            'Giving food/drink (in case surgery needed)',
            'Attempting to "pop" joint back in place',
            'Removing shoes/clothes (may not get back on due to swelling)'
          ]
        },
        tips: {
          title: '💡 Pro Tips',
          items: [
            'SAM splints (moldable aluminum) are ideal for first aid kits',
            '"Buddy taping" works well for finger/toe injuries',
            'Swelling typically peaks at 24-72 hours post-injury',
            'Keep elastic bandages in various sizes',
            'Document injury time and mechanism if possible'
          ]
        }
      }
    },
    {
      title: 'Heart Attack & Stroke',
      content: {
        emergency: {
          title: 'Emergency Response Steps:',
          steps: [
            'For Suspected HEART ATTACK:',
            '- Call ambulance immediately (Every minute counts!)',
            '- Have the person sit down and stay calm',
            '- Give aspirin (325mg) if available and not allergic',
            '- Monitor breathing - Prepare to perform CPR if unconscious',
            '',
            'For Suspected STROKE (Use FAST Test):',
            '- Face: Ask to smile → Is one side drooping?',
            '- Arms: Raise both arms → Does one drift down?',
            '- Speech: Repeat a phrase → Is it slurred/confused?',
            '- Time: If ANY symptom → Call ambulance immediately!'
          ]
        },
        detailedSteps: {
          title: '📝 Detailed Response Guide',
          sections: [
            {
              subtitle: 'Heart Attack Symptoms vs. Indigestion',
              table: {
                headers: ['Heart Attack Signs', 'Indigestion'],
                rows: [
                  ['Crushing chest pain (radiating to arm/jaw)', 'Burning chest pain'],
                  ['Cold sweat, nausea', 'Belching relief'],
                  ['Shortness of breath', 'No breathing changes']
                ]
              }
            },
            {
              subtitle: 'Stroke Specifics',
              steps: [
                'Time = Brain Cells: Note symptom onset time',
                'Golden Hour: Treatment within 60 mins improves outcomes',
                'Silent Stroke Signs: Sudden imbalance, vision loss, confusion'
              ]
            },
            {
              subtitle: 'Immediate Actions for Heart Attack',
              steps: [
                'Do NOT wait more than 5 minutes to call ambulance!',
                'Keep the person still and calm',
                'Loosen any tight clothing',
                'Monitor breathing and consciousness',
                'Have them chew aspirin if available and not allergic'
              ]
            },
            {
              subtitle: 'FAST Test Details',
              steps: [
                'F - Face: Look for uneven smile or drooping',
                'A - Arms: Watch for one arm drifting down',
                'S - Speech: Listen for slurred or confused words',
                'T - Time: Note when symptoms started and call ambulance'
              ]
            }
          ]
        },
        warnings: {
          title: '⚠️ Call ambulance IMMEDIATELY if:',
          items: [
            'Any FAST stroke signs appear',
            'Chest pain lasts more than 5 minutes',
            'Difficulty breathing or shortness of breath',
            'Loss of consciousness',
            'Sudden severe headache',
            'Confusion or difficulty speaking'
          ]
        },
        videos: {
          title: '🎥 Video Demonstrations',
          links: [
            { title: 'American Heart Association: Heart Attack Warning Signs', url: '#' },
            { title: 'National Stroke Association: FAST Test', url: '#' }
          ]
        },
        quiz: {
          title: '❓ Knowledge Quiz',
          questions: [
            {
              question: 'Which symptom requires calling ambulance for possible stroke?',
              options: [
                'Arm numbness lasting 2 minutes',
                'Sudden slurred speech',
                'Mild headache'
              ],
              correctAnswer: 'Sudden slurred speech'
            },
            {
              question: 'True or False: You should drive a heart attack victim to the hospital yourself',
              answer: 'False (EMS can start treatment en route)'
            }
          ]
        },
        mistakes: {
          title: '⚠️ Critical Mistakes to Avoid',
          items: [
            'Delaying calling ambulance to "wait and see"',
            'Giving nitroglycerin unless prescribed',
            'Letting the victim deny symptoms ("I\'m fine")',
            'Driving the victim yourself instead of calling ambulance',
            'Ignoring mild or "different" symptoms'
          ]
        },
        tips: {
          title: '💡 Pro Tips',
          items: [
            'Keep chewable aspirin in your first aid kit',
            'Know your nearest stroke-certified hospital',
            'Text-to-ambulance is available in many areas if unable to speak',
            'Learn the less common signs of heart attack and stroke',
            'Keep a list of the person\'s medications and allergies'
          ]
        }
      }
    },
    {
      title: 'Allergic Reaction & Anaphylaxis',
      content: {
        emergency: {
          title: 'Emergency Response Steps:',
          steps: [
            'For Mild/Moderate Allergic Reaction:',
            '- Give antihistamine (Benadryl/Benedryl - diphenhydramine)',
            '- Monitor breathing closely',
            '- Call doctor for next steps',
            '',
            'For SEVERE Reaction (Anaphylaxis):',
            '- Use EPINEPHRINE AUTO-INJECTOR (EpiPen/Auvi-Q) immediately:',
            '  • Remove safety cap',
            '  • Press firmly against outer thigh (through clothing if needed)',
            '  • Hold for 3 seconds',
            '- Call ambulance even if symptoms improve',
            '- Lie person flat (raise legs if breathing is okay)',
            '- Second dose after 5-15 minutes if needed'
          ]
        },
        detailedSteps: {
          title: '📝 Detailed Response Guide',
          sections: [
            {
              subtitle: 'Symptom Severity Chart',
              table: {
                headers: ['Mild/Moderate', 'Severe (Anaphylaxis)'],
                rows: [
                  ['Hives/rash', 'Swelling (face/lips/tongue)'],
                  ['Itching', 'Throat tightness/hoarseness'],
                  ['Stomach pain', 'Wheezing/trouble breathing'],
                  ['', 'Dizziness/fainting']
                ]
              }
            },
            {
              subtitle: 'Key Difference:',
              steps: [
                'Anaphylaxis always involves breathing difficulties OR low blood pressure'
              ]
            },
            {
              subtitle: 'EpiPen Administration Visual Guide',
              steps: [
                'Blue to the sky, orange to the thigh',
                'Jab and hold (3 seconds)',
                'Massage area after injection',
                'Note time given'
              ]
            },
            {
              subtitle: 'After EpiPen Use',
              steps: [
                'Call ambulance immediately',
                'Keep person lying flat',
                'Monitor breathing and pulse',
                'Prepare for second dose if needed',
                'Give EpiPen to EMS when they arrive'
              ]
            }
          ]
        },
        warnings: {
          title: '⚠️ Seek Emergency Help IMMEDIATELY if:',
          items: [
            'Any signs of anaphylaxis appear',
            'Breathing becomes difficult',
            'Swelling in throat or tongue',
            'Person becomes confused or faint',
            'Symptoms return after EpiPen use'
          ]
        },
        videos: {
          title: '🎥 Video Demonstrations',
          links: [
            { title: 'How to Use an EpiPen - Allergy & Anaphylaxis Australia', url: '#' },
            { title: 'Recognizing Anaphylaxis - American Academy of Allergy', url: '#' }
          ]
        },
        quiz: {
          title: '❓ Knowledge Quiz',
          questions: [
            {
              question: 'When should you use an EpiPen?',
              options: [
                'Only for food allergies',
                'For any severe reaction with breathing trouble',
                'Only after antihistamines'
              ],
              correctAnswer: 'For any severe reaction with breathing trouble'
            },
            {
              question: 'True or False: You should stand up during anaphylaxis',
              answer: 'False (Lying flat prevents "empty ventricle syndrome")'
            }
          ]
        },
        mistakes: {
          title: '⚠️ Critical Mistakes to Avoid',
          items: [
            'Delaying epinephrine use',
            'Making person vomit if food allergy',
            'Using antihistamine alone for severe reactions',
            'Letting the person stand or walk',
            'Waiting to see if symptoms improve'
          ]
        },
        tips: {
          title: '💡 Pro Tips',
          items: [
            'Store EpiPens at room temperature (not in car)',
            'Know hidden allergen names (e.g., "casein" for milk)',
            'Medical alert jewelry saves lives',
            'Keep at least two auto-injectors available',
            'Check expiration dates regularly'
          ]
        }
      }
    },
  ]

  const filteredGuidelines = guidelines.filter(guide => {
    const searchTerm = searchQuery.toLowerCase();
    const titleMatch = guide.title.toLowerCase().includes(searchTerm);
    const contentMatch = guide.content && Object.values(guide.content).some(section => {
      if (typeof section === 'object') {
        // Search in emergency steps
        const emergencySteps = section.steps?.join(' ').toLowerCase().includes(searchTerm);
        // Search in detailed steps
        const detailedSteps = section.sections?.some(s => 
          s.steps?.join(' ').toLowerCase().includes(searchTerm) ||
          s.subtitle?.toLowerCase().includes(searchTerm)
        );
        // Search in warnings
        const warnings = section.items?.join(' ').toLowerCase().includes(searchTerm);
        return emergencySteps || detailedSteps || warnings;
      }
      return false;
    });
    return titleMatch || contentMatch;
  });

  const renderSection = (guide) => {
    if (guide.content) {
      // New format with detailed content
      return (
        <VStack align="stretch" spacing={6}>
          {/* Emergency Section */}
          <Box>
            <Text fontSize="lg" fontWeight="bold" mb={3}>{guide.content.emergency.title}</Text>
            <List spacing={3}>
              {guide.content.emergency.steps.map((step, index) => (
                <ListItem key={index} display="flex" alignItems="center">
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  {step}
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Show/Hide Details Button */}
          <Box>
            <Button
              leftIcon={<Icon as={MdExpandMore} />}
              colorScheme="blue"
              variant="outline"
              onClick={() => setShowDetails(!showDetails)}
              mb={4}
            >
              {showDetails ? 'Hide Details' : 'Show Details'}
            </Button>
            
            {showDetails && (
              <VStack align="stretch" spacing={6}>
                {/* Detailed Steps */}
                {guide.content.detailedSteps && (
                  <Box>
                    <Text fontSize="xl" fontWeight="bold" mb={4}>
                      {guide.content.detailedSteps.title}
                    </Text>
                    {guide.content.detailedSteps.sections.map((section, index) => (
                      <Box key={index} mb={4}>
                        <Text fontWeight="bold" mb={2}>{section.subtitle}</Text>
                        {section.steps && (
                          <List spacing={2}>
                            {section.steps.map((step, stepIndex) => (
                              <ListItem key={stepIndex}>{step}</ListItem>
                            ))}
                          </List>
                        )}
                        {section.table && (
                          <Table variant="simple" size="sm" mt={2}>
                            <Thead>
                              <Tr>
                                {section.table.headers.map((header, i) => (
                                  <Th key={i}>{header}</Th>
                                ))}
                              </Tr>
                            </Thead>
                            <Tbody>
                              {section.table.rows.map((row, i) => (
                                <Tr key={i}>
                                  {row.map((cell, j) => (
                                    <Td key={j}>{cell}</Td>
                                  ))}
                                </Tr>
                              ))}
                            </Tbody>
                          </Table>
                        )}
                      </Box>
                    ))}
                  </Box>
                )}

                {/* Warnings */}
                {guide.content.warnings && (
                  <Alert status="warning">
                    <AlertIcon />
                    <Box>
                      <Text fontWeight="bold">{guide.content.warnings.title}</Text>
                      <List spacing={2} mt={2}>
                        {guide.content.warnings.items.map((item, index) => (
                          <ListItem key={index}>{item}</ListItem>
                        ))}
                      </List>
                    </Box>
                  </Alert>
                )}

                {/* Videos */}
                {guide.content.videos && (
                  <Box>
                    <Text fontSize="lg" fontWeight="bold" mb={3}>{guide.content.videos.title}</Text>
                    <List spacing={3}>
                      {guide.content.videos.links.map((video, index) => (
                        <ListItem key={index}>
                          <Button
                            leftIcon={<Icon as={FaVideo} />}
                            variant="outline"
                            colorScheme="blue"
                            size="sm"
                            onClick={() => window.open(video.url, '_blank')}
                          >
                            {video.title}
                          </Button>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}

                {/* Quiz */}
                {guide.content.quiz && (
                  <Box>
                    <Text fontSize="lg" fontWeight="bold" mb={3}>{guide.content.quiz.title}</Text>
                    {guide.content.quiz.questions.map((q, index) => (
                      <Box key={index} mb={4}>
                        <Text fontWeight="medium" mb={2}>{q.question}</Text>
                        {q.options ? (
                          <Box>
                            <RadioGroup
                              value={quizAnswers[index]}
                              onChange={(value) => handleQuizAnswer(index, value)}
                            >
                              <Stack>
                                {q.options.map((option, i) => (
                                  <Radio key={i} value={option}>
                                    {option}
                                  </Radio>
                                ))}
                              </Stack>
                            </RadioGroup>
                            <Button
                              mt={2}
                              colorScheme="green"
                              size="sm"
                              onClick={() => handleSubmitAnswer(index)}
                              isDisabled={!quizAnswers[index] || submittedAnswers[index]}
                            >
                              Submit Answer
                            </Button>
                            {submittedAnswers[index] && (
                              <Alert status="info" mt={2}>
                                <AlertIcon />
                                <Text>
                                  {quizAnswers[index] === q.correctAnswer
                                    ? 'Correct!'
                                    : `Incorrect. The correct answer is: ${q.correctAnswer}`}
                                </Text>
                              </Alert>
                            )}
                          </Box>
                        ) : (
                          <Box>
                            <RadioGroup
                              value={quizAnswers[index]}
                              onChange={(value) => handleQuizAnswer(index, value)}
                            >
                              <Stack>
                                <Radio value="true">True</Radio>
                                <Radio value="false">False</Radio>
                              </Stack>
                            </RadioGroup>
                            <Button
                              mt={2}
                              colorScheme="green"
                              size="sm"
                              onClick={() => handleSubmitAnswer(index)}
                              isDisabled={!quizAnswers[index] || submittedAnswers[index]}
                            >
                              Submit Answer
                            </Button>
                            {submittedAnswers[index] && (
                              <Alert status="info" mt={2}>
                                <AlertIcon />
                                <Text>
                                  {quizAnswers[index] === 'true' ? 'Correct!' : `Incorrect. ${q.answer}`}
                                </Text>
                              </Alert>
                            )}
                          </Box>
                        )}
                      </Box>
                    ))}
                  </Box>
                )}

                {/* Mistakes */}
                {guide.content.mistakes && (
                  <Box>
                    <Text fontSize="lg" fontWeight="bold" mb={3}>{guide.content.mistakes.title}</Text>
                    <List spacing={2}>
                      {guide.content.mistakes.items.map((item, index) => (
                        <ListItem key={index} display="flex" alignItems="center">
                          <ListIcon as={MdWarning} color="red.500" />
                          {item}
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}

                {/* Tips */}
                {guide.content.tips && (
                  <Box>
                    <Text fontSize="lg" fontWeight="bold" mb={3}>{guide.content.tips.title}</Text>
                    <List spacing={2}>
                      {guide.content.tips.items.map((tip, index) => (
                        <ListItem key={index} display="flex" alignItems="center">
                          <ListIcon as={BsDropletFill} color="blue.500" />
                          {tip}
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}
              </VStack>
            )}
          </Box>
        </VStack>
      );
    } else {
      // Old format
      return (
        <>
          <List spacing={3}>
            {guide.steps.map((step, stepIndex) => (
              <ListItem key={stepIndex} display="flex" alignItems="center">
                <ListIcon as={MdCheckCircle} color="green.500" />
                {step}
              </ListItem>
            ))}
          </List>
          {guide.warning && (
            <Alert status="warning" mt={4}>
              <AlertIcon />
              {guide.warning}
            </Alert>
          )}
        </>
      );
    }
  };

  return (
    <Container maxW="container.lg" py={10}>
      <Box textAlign="center" mb={10}>
        <Heading as="h1" size="2xl" color="green.600" mb={4}>
          First Aid Guidelines
        </Heading>
        <Text fontSize="lg" color="gray.600" mb={6}>
          Essential first aid instructions for common emergency situations.
          Always call emergency services for serious situations.
        </Text>
        
        {/* Search Bar */}
        <InputGroup maxW="600px" mx="auto" mb={4}>
          <InputLeftElement pointerEvents="none">
            <Icon as={MdSearch} color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Search guidelines (e.g., 'CPR', 'bleeding', 'fracture')..."
            value={searchQuery}
            onChange={handleSearch}
            size="lg"
            borderRadius="full"
            bg="white"
            _placeholder={{ color: 'gray.400' }}
            _focus={{ borderColor: 'green.400', boxShadow: '0 0 0 1px var(--chakra-colors-green-400)' }}
          />
        </InputGroup>
        
        {searchQuery && filteredGuidelines.length === 0 && (
          <Alert status="info" borderRadius="md">
            <AlertIcon />
            No guidelines found matching "{searchQuery}". Try different keywords.
          </Alert>
        )}
      </Box>

      <Alert status="warning" mb={8}>
        <AlertIcon />
        These guidelines are for informational purposes only. In case of emergency,
        always call professional medical services immediately.
      </Alert>

      <Accordion allowMultiple>
        {filteredGuidelines.map((guide, index) => (
          <AccordionItem key={index}>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  {guide.title}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {renderSection(guide)}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Container>
  );
}

export default Guidelines; 