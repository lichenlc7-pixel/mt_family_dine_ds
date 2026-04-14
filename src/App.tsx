/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Check, 
  Phone, 
  Clock, 
  Heart, 
  Utensils, 
  ShieldCheck, 
  History, 
  Settings, 
  CreditCard,
  Share2,
  Download,
  Plus,
  Home,
  PieChart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
type ScreenId = 
  | 'S-01' | 'S-02' | 'S-03' | 'S-04' | 'S-05' | 'S-06'
  | 'C-01' | 'C-02' | 'C-03' | 'C-04' | 'C-05' | 'C-06' | 'C-07'
  | 'P-01' | 'P-02' | 'P-03' | 'P-04'
  | 'D-01' | 'D-02' | 'D-03';

interface FormData {
  phone: string;
  relation: string;
  age: number;
  lunchEnabled: boolean;
  lunchTime: string;
  dinnerEnabled: boolean;
  dinnerTime: string;
  mealLevel: string;
  healthConditions: string[];
  tastePreferences: string[];
  texture: string;
  spiciness: string;
  taboos: string[];
  balance: number;
}

// --- Components ---

const StatusBar = () => (
  <div className="ios-status-bar">
    <div className="dynamic-island"></div>
    <div className="flex items-center gap-1">
      <span>9:41</span>
    </div>
    <div className="flex items-center gap-1.5">
      <svg width="17" height="11" viewBox="0 0 17 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 9.5H3V10.5H1V9.5ZM4.5 7H6.5V10.5H4.5V7ZM8 4.5H10V10.5H8V4.5ZM11.5 1H13.5V10.5H11.5V1ZM15 1H16V10.5H15V1Z" fill="currentColor"/></svg>
      <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 10.5L0 3C2.5 0.5 5 0 7.5 0C10 0 12.5 0.5 15 3L7.5 10.5Z" fill="currentColor"/></svg>
      <svg width="25" height="12" viewBox="0 0 25 12" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor"/><rect x="2.5" y="2.5" width="17" height="7" rx="1.5" fill="currentColor"/><path d="M22.5 4V8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
    </div>
  </div>
);

// --- Mock Data ---
const MEAL_LEVELS = [
  { id: 'basic', name: '实惠放心餐', price: '¥15-25', desc: '家常菜为主，干净卫生，适合日常', icon: '🍱', color: 'bg-green-50', tag: '性价比高' },
  { id: 'standard', name: '标准营养餐', price: '¥25-50', desc: '荤素搭配，营养均衡，最受欢迎', icon: '🥗', color: 'bg-blue-50', tag: '多数人选', isPopular: true },
  { id: 'premium', name: '优选品质餐', price: '¥50-100', desc: '精选食材，精细烹饪，适合特殊节日', icon: '🍲', color: 'bg-orange-50', tag: '品质之选' },
];

const HEALTH_TAGS = [
  '高血压', '糖尿病', '高血脂', '心脏病',
  '肾病', '痛风', '骨质疏松', '消化不好',
  '暂无特殊情况'
];

const TASTE_TAGS = ['清淡口味', '重口味', '软糯易咀嚼', '喜欢汤类', '偏爱面食', '米饭为主'];
const TABOO_TAGS = ['🩺 低盐低油', '🩺 低糖', '🥩 不吃牛羊肉', '🦐 不吃海鲜', '🌶 不吃辣'];

const MOCK_DISHES = [
  { id: 1, name: '番茄鸡蛋面', desc: '暖胃家常，软糯易消化', shop: '老街面馆', icon: '🍜', price: 22 },
  { id: 2, name: '红烧肉盖饭', desc: '酱香浓郁，配菜丰富', shop: '厨房大叔', icon: '🍱', price: 32 },
  { id: 3, name: '清蒸鱼套餐', desc: '清淡鲜美，含蔬菜', shop: '渔家小厨', icon: '🐟', price: 45 },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<ScreenId>('S-01');
  const [history, setHistory] = useState<ScreenId[]>([]);
  const [formData, setFormData] = useState<FormData>({
    phone: '',
    relation: '家人',
    age: 72,
    lunchEnabled: true,
    lunchTime: '11:30',
    dinnerEnabled: true,
    dinnerTime: '17:30',
    mealLevel: 'standard',
    healthConditions: [],
    tastePreferences: [],
    texture: '正常口感',
    spiciness: '不辣',
    taboos: [],
    balance: 0,
  });

  const [isTestCalling, setIsTestCalling] = useState(false);
  const [testCallDone, setTestCallDone] = useState(false);

  // Navigation helpers
  const navigateTo = (page: ScreenId) => {
    setHistory(prev => [...prev, currentPage]);
    setCurrentPage(page);
  };

  const goBack = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory(prev => prev.slice(0, -1));
      setCurrentPage(prev);
    }
  };

  // --- Components ---

  const Header = ({ title, subtitle, showBack = true, showSkip = true, step = 0 }: { title: string, subtitle?: string, showBack?: boolean, showSkip?: boolean, step?: number }) => (
    <div className="bg-white border-b border-gray-100">
      <StatusBar />
      <div className="px-4 py-3 relative flex items-center justify-between">
        <div className="w-10">
          {showBack && <button onClick={goBack} className="p-1"><ChevronLeft size={24} /></button>}
        </div>
        <div className="flex-1 text-center">
          <h1 className="text-lg font-bold text-[#1A1A1A]">{title}</h1>
          {subtitle && <p className="text-[11px] text-gray-400 font-medium">{subtitle}</p>}
        </div>
        <div className="w-10 text-right">
          {showSkip && <button onClick={() => {
            const currentStep = parseInt(currentPage.split('-')[1]);
            const nextStep = currentStep + 1;
            if (nextStep <= 7) navigateTo(`C-0${nextStep}` as ScreenId);
          }} className="text-sm text-gray-500 font-medium">跳过</button>}
        </div>
        {step > 0 && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-100">
            <div className="h-full bg-[#FFE346]" style={{ width: `${(step / 7) * 100}%` }}></div>
          </div>
        )}
        <div className="absolute top-12 right-2 text-[10px] text-gray-300 font-mono">{currentPage}</div>
      </div>
    </div>
  );

  const ParentHeader = ({ title }: { title: string }) => (
    <div className="bg-white">
      <StatusBar />
      <div className="px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#1A1A1A]">{title}</h1>
        <span className="text-lg font-bold text-gray-500">11:30</span>
        <div className="absolute top-12 right-2 text-[10px] text-gray-300 font-mono">{currentPage}</div>
      </div>
    </div>
  );

  // --- Renderers ---

  const renderS01 = () => (
    <div className="h-full bg-black/40 flex flex-col justify-end">
      <StatusBar />
      <div className="flex-1" onClick={() => navigateTo('S-02')}></div>
      <motion.div 
        initial={{ y: 300 }} animate={{ y: 0 }}
        className="bg-white rounded-t-[32px] p-6 pb-10 flex flex-col items-center text-center"
      >
        <div className="w-10 h-1 bg-gray-200 rounded-full mb-6"></div>
        <h1 className="text-2xl font-bold mb-6 text-[#1A1A1A]">美团家人助餐</h1>
        <div className="w-full h-40 bg-[#FFFBEA] rounded-2xl mb-6 flex items-center justify-center">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <rect x="30" y="20" width="60" height="80" rx="8" fill="none" stroke="#FFE346" strokeWidth="3" />
            <text x="42" y="55" fontSize="14" fontWeight="bold" fill="#1A1A1A">11:30</text>
            <circle cx="85" cy="85" r="25" fill="#FFE346" opacity="0.2" />
            <path d="M70 85 Q85 65 100 85" stroke="#1A1A1A" strokeWidth="2" fill="none" />
            <path d="M75 90 Q85 75 95 90" stroke="#1A1A1A" strokeWidth="2" fill="none" />
          </svg>
        </div>
        <h2 className="text-xl font-bold mb-2 text-[#1A1A1A]">帮家人把吃饭这件事安排好</h2>
        <p className="text-sm text-gray-500 mb-8">每天定时提醒，一个电话，饭就送到家</p>
        <button onClick={() => navigateTo('S-02')} className="btn-primary mb-4">了解一下</button>
        <button onClick={() => {}} className="btn-ghost font-bold">下次再说</button>
      </motion.div>
    </div>
  );

  const renderOnboarding = (index: number, title: string, desc: string, icon: React.ReactNode) => (
    <div className="h-full flex flex-col bg-white">
      <StatusBar />
      <div className="px-6 pt-2 flex justify-between items-center">
        <button onClick={goBack} className="text-gray-400 p-2 -ml-2">
          <ChevronLeft size={24} />
        </button>
        <button onClick={() => navigateTo('C-01')} className="text-gray-500 font-bold">跳过</button>
      </div>
      <div className="onboarding-clickable px-6 flex-1 flex flex-col" onClick={() => index < 6 ? navigateTo(`S-0${index + 1}` as ScreenId) : navigateTo('C-01')}>
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="w-full h-[55%] bg-[#FAFAF8] rounded-3xl mb-8 flex items-center justify-center overflow-hidden">
            {icon}
          </div>
          <h2 className="text-2xl font-bold mb-4 text-[#1A1A1A]">{title}</h2>
          <p className="text-sm text-gray-500 leading-relaxed px-4">{desc}</p>
        </div>
      </div>
      <div className="px-6 py-8 flex flex-col items-center">
        <div className="flex gap-2 mb-8">
          {[2,3,4,5,6].map(i => (
            <div key={i} className={`w-2 h-2 rounded-full ${i === index ? 'bg-[#FFE346] w-4' : 'bg-gray-200'}`}></div>
          ))}
        </div>
        {index < 6 ? (
          <button onClick={() => navigateTo(`S-0${index + 1}` as ScreenId)} className="p-4 bg-[#FFFBEA] rounded-full text-[#1A1A1A]">
            <ChevronRight size={32} />
          </button>
        ) : (
          <button onClick={() => navigateTo('C-01')} className="btn-primary">开启家人助餐服务</button>
        )}
      </div>
      <div className="absolute top-12 right-2 text-[10px] text-gray-300 font-mono">{currentPage}</div>
    </div>
  );

  const renderC01 = () => (
    <div className="h-full flex flex-col bg-[#FAFAF8]">
      <Header title="绑定家人信息" subtitle="填写家人联系方式，以便助手提供服务" step={1} />
      <div className="p-6 space-y-8">
        <div className="card space-y-4">
          <label className="text-sm font-bold">家人手机号</label>
          <div className="flex gap-2">
            <div className="flex-1 flex items-center border border-gray-200 rounded-xl px-3 bg-gray-50">
              <span className="text-gray-400 mr-2">+86</span>
              <input 
                type="tel" 
                placeholder="请输入手机号" 
                className="bg-transparent w-full h-12 outline-none"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <button className="px-4 bg-[#FFFBEA] text-[#1A1A1A] rounded-xl text-sm font-medium border border-[#FFE346]">获取验证码</button>
          </div>
          <div className="flex gap-3">
            {[1,2,3,4].map(i => <div key={i} className="flex-1 h-12 border border-gray-200 rounded-xl bg-gray-50"></div>)}
          </div>
          <p className="text-[12px] text-gray-400">由您填写即可，无需家人在场验证</p>
        </div>

        <div className="card space-y-4">
          <label className="text-sm font-bold">怎么称呼 TA</label>
          <div className="flex flex-wrap gap-2">
            {['爸爸', '妈妈', '爷爷', '奶奶', '外公', '外婆'].map(item => (
              <button 
                key={item}
                onClick={() => setFormData({...formData, relation: item})}
                className={`px-4 py-2 rounded-full text-sm border transition-all ${formData.relation === item ? 'bg-[#FFE346] border-[#FFE346] font-bold' : 'bg-white border-gray-200 text-gray-500'}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="card space-y-6">
          <div className="flex justify-between items-center">
            <label className="text-sm font-bold">大概年龄</label>
            <span className="text-[#FFE346] font-bold text-lg">{formData.age} 岁</span>
          </div>
          <input 
            type="range" min="55" max="90" 
            value={formData.age}
            onChange={e => setFormData({...formData, age: parseInt(e.target.value)})}
            className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#FFE346]"
          />
          <div className="flex justify-between text-[10px] text-gray-400">
            <span>55岁</span>
            <span>90岁</span>
          </div>
        </div>
      </div>
      <div className="mt-auto p-6">
        <button onClick={() => navigateTo('C-02')} className="btn-primary">下一步</button>
      </div>
    </div>
  );

  const renderC02 = () => (
    <div className="h-full flex flex-col bg-[#FAFAF8]">
      <Header title="设置提醒时间" subtitle="助手将按时拨打电话，确认家人用餐需求" step={2} />
      <div className="p-6 space-y-6">
        <div className="card space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-500"><Clock size={20} /></div>
              <div>
                <div className="font-bold">午餐提醒</div>
                <div className="text-xs text-gray-400">建议 11:00 左右</div>
              </div>
            </div>
            <div className={`w-12 h-6 rounded-full p-1 transition-colors ${formData.lunchEnabled ? 'bg-[#FFE346]' : 'bg-gray-200'}`} onClick={() => setFormData({...formData, lunchEnabled: !formData.lunchEnabled})}>
              <div className={`w-4 h-4 bg-white rounded-full transition-transform ${formData.lunchEnabled ? 'translate-x-6' : ''}`}></div>
            </div>
          </div>
          {formData.lunchEnabled && (
            <div className="flex gap-2 pt-2">
              {['10:30', '11:00', '11:30'].map(t => (
                <button 
                  key={t}
                  onClick={() => setFormData({...formData, lunchTime: t})}
                  className={`flex-1 py-3 rounded-xl text-sm font-medium border ${formData.lunchTime === t ? 'bg-[#FFE346] border-[#FFE346]' : 'bg-gray-50 border-gray-100 text-gray-500'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="card space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-500"><Clock size={20} /></div>
              <div>
                <div className="font-bold">晚餐提醒</div>
                <div className="text-xs text-gray-400">建议 17:30 左右</div>
              </div>
            </div>
            <div className={`w-12 h-6 rounded-full p-1 transition-colors ${formData.dinnerEnabled ? 'bg-[#FFE346]' : 'bg-gray-200'}`} onClick={() => setFormData({...formData, dinnerEnabled: !formData.dinnerEnabled})}>
              <div className={`w-4 h-4 bg-white rounded-full transition-transform ${formData.dinnerEnabled ? 'translate-x-6' : ''}`}></div>
            </div>
          </div>
          {formData.dinnerEnabled && (
            <div className="flex gap-2 pt-2">
              {['17:00', '17:30', '18:00'].map(t => (
                <button 
                  key={t}
                  onClick={() => setFormData({...formData, dinnerTime: t})}
                  className={`flex-1 py-3 rounded-xl text-sm font-medium border ${formData.dinnerTime === t ? 'bg-[#FFE346] border-[#FFE346]' : 'bg-gray-50 border-gray-100 text-gray-500'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>
        <p className="text-[12px] text-gray-400 text-center">建议比平时开饭早30分钟，家人有时间等待配送</p>
      </div>
      <div className="mt-auto p-6">
        <button onClick={() => navigateTo('C-03')} className="btn-primary">下一步</button>
      </div>
    </div>
  );

  const renderC03 = () => (
    <div className="h-full flex flex-col bg-[#FAFAF8]">
      <Header title="选择餐标档次" subtitle="根据家人的消费习惯选择合适的档次" step={3} />
      <div className="p-6 space-y-4">
        {MEAL_LEVELS.map(level => (
          <div 
            key={level.id}
            onClick={() => setFormData({...formData, mealLevel: level.id})}
            className={`card relative flex items-center gap-4 border-2 transition-all cursor-pointer ${formData.mealLevel === level.id ? 'border-[#FFE346] bg-[#FFFBEA]' : 'border-transparent'}`}
          >
            {level.isPopular && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm">
                最受欢迎
              </div>
            )}
            <div className="text-3xl">{level.icon}</div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold">{level.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${level.color} text-gray-600 font-medium`}>{level.tag}</span>
                </div>
                <span className="text-[#1A1A1A] font-bold">{level.price}<span className="text-[10px] font-normal">/餐</span></span>
              </div>
              <div className="text-xs text-gray-500">{level.desc}</div>
            </div>
            {formData.mealLevel === level.id && (
              <div className="w-6 h-6 bg-[#FFE346] rounded-full flex items-center justify-center">
                <Check size={14} />
              </div>
            )}
          </div>
        ))}
        <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex items-start gap-3 mt-4">
          <ShieldCheck size={18} className="text-blue-500 mt-0.5 shrink-0" />
          <p className="text-[11px] text-blue-700 leading-relaxed">
            <span className="font-bold">服务保障：</span>所有合作商家均经过美团严格筛选，具备适老化餐饮服务资质，食材新鲜，卫生达标。
          </p>
        </div>
        <p className="text-[12px] text-gray-400 pt-2">后续可随时在「家人助餐服务」中调整，不影响已有订单</p>
      </div>
      <div className="mt-auto p-6">
        <button onClick={() => navigateTo('C-04')} className="btn-primary">下一步</button>
      </div>
    </div>
  );

  const renderC04 = () => (
    <div className="h-full flex flex-col bg-[#FAFAF8]">
      <Header title="饮食偏好 & 健康档案" subtitle="AI 助手将根据此信息为家人推荐菜品" step={4} />
      <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-24">
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-1 h-5 bg-[#FFE346] rounded-full"></div>
            <h3 className="font-bold">{formData.relation}有哪些健康状况？</h3>
          </div>
          <p className="text-xs text-gray-400">AI 会据此过滤不合适的菜品，保障饮食安全</p>
          <div className="flex flex-wrap gap-2">
            {HEALTH_TAGS.map(tag => (
              <button 
                key={tag}
                onClick={() => {
                  if (tag === '暂无特殊情况') {
                    setFormData({...formData, healthConditions: ['暂无特殊情况']});
                  } else {
                    const filtered = formData.healthConditions.filter(c => c !== '暂无特殊情况');
                    if (filtered.includes(tag)) {
                      setFormData({...formData, healthConditions: filtered.filter(c => c !== tag)});
                    } else {
                      setFormData({...formData, healthConditions: [...filtered, tag]});
                    }
                  }
                }}
                className={`px-4 py-2 rounded-full text-sm border transition-all ${formData.healthConditions.includes(tag) ? 'bg-[#FFFBEA] border-[#FFE346] font-bold' : 'bg-white border-gray-200 text-gray-500'}`}
              >
                {tag}
              </button>
            ))}
          </div>
          <button className="text-sm text-gray-600 font-bold flex items-center gap-1">更多健康需求 ▾</button>
        </section>
        <div className="h-[1px] bg-gray-100 w-full"></div>
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-1 h-5 bg-[#FFE346] rounded-full"></div>
            <h3 className="font-bold">口味喜好</h3>
          </div>
          
          <div className="space-y-3">
            <label className="text-xs text-gray-400">口味偏好（多选）</label>
            <div className="flex flex-wrap gap-2">
              {TASTE_TAGS.map(tag => (
                <button 
                  key={tag}
                  onClick={() => {
                    if (formData.tastePreferences.includes(tag)) {
                      setFormData({...formData, tastePreferences: formData.tastePreferences.filter(t => t !== tag)});
                    } else {
                      setFormData({...formData, tastePreferences: [...formData.tastePreferences, tag]});
                    }
                  }}
                  className={`px-4 py-2 rounded-full text-sm border transition-all ${formData.tastePreferences.includes(tag) ? 'bg-[#FFFBEA] border-[#FFE346] font-bold' : 'bg-white border-gray-200 text-gray-500'}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs text-gray-400">口感选择</label>
            <div className="flex gap-2">
              {['软烂为主', '正常口感'].map(t => (
                <button 
                  key={t}
                  onClick={() => setFormData({...formData, texture: t})}
                  className={`flex-1 py-3 rounded-xl text-sm font-medium border ${formData.texture === t ? 'bg-[#FFE346] border-[#FFE346]' : 'bg-white border-gray-100 text-gray-500'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs text-gray-400">饮食禁忌</label>
            <div className="flex flex-wrap gap-2">
              {TABOO_TAGS.map(tag => (
                <button 
                  key={tag}
                  onClick={() => {
                    if (formData.taboos.includes(tag)) {
                      setFormData({...formData, taboos: formData.taboos.filter(t => t !== tag)});
                    } else {
                      setFormData({...formData, taboos: [...formData.taboos, tag]});
                    }
                  }}
                  className={`px-4 py-2 rounded-full text-sm border transition-all ${formData.taboos.includes(tag) ? 'bg-[#FFFBEA] border-[#FFE346] font-bold' : 'bg-white border-gray-200 text-gray-500'}`}
                >
                  {tag}
                </button>
              ))}
              <button className="px-4 py-2 rounded-full text-sm border border-dashed border-gray-300 text-gray-400">+ 自定义</button>
            </div>
          </div>
        </section>
      </div>
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#FAFAF8] via-[#FAFAF8] to-transparent">
        <button onClick={() => navigateTo('C-06')} className="btn-primary">下一步</button>
      </div>
    </div>
  );

  const renderC05 = () => (
    <div className="h-full flex flex-col bg-[#FAFAF8]">
      <Header title="充值家庭餐费" subtitle="餐费将存入家庭账户，由助手代为下单" step={6} />
      <div className="p-6 space-y-6">
        <div className="bg-[#FFFBEA] p-4 rounded-2xl border border-[#FFE346]/20">
          <div className="text-sm font-medium mb-1">按当前餐标，预计每月消耗约</div>
          <div className="text-2xl font-bold text-[#1A1A1A]">¥ 1,500</div>
          <div className="text-[10px] text-gray-400 mt-2">实际以消费为准，未消费余额随时退还</div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[200, 500, 1000, 2000, 3000].map(amount => (
            <button 
              key={amount}
              onClick={() => setFormData({...formData, balance: amount})}
              className={`py-4 rounded-xl text-lg font-bold border transition-all ${formData.balance === amount ? 'bg-[#FFE346] border-[#FFE346]' : 'bg-white border-gray-100 text-gray-500'}`}
            >
              ¥{amount}
            </button>
          ))}
          <button className="py-4 rounded-xl text-sm font-medium border bg-white border-gray-100 text-gray-400">自定义</button>
        </div>

        <div className="card flex justify-between items-center">
          <div>
            <div className="font-bold">自动续充</div>
            <div className="text-xs text-gray-400">余额不足100元时自动续充500元</div>
          </div>
          <div className="w-12 h-6 bg-[#FFE346] rounded-full p-1">
            <div className="w-4 h-4 bg-white rounded-full translate-x-6"></div>
          </div>
        </div>

        <p className="text-[12px] text-gray-400 text-center">支持随时退款，未消费金额原路退回，1-3个工作日到账</p>
      </div>
      <div className="mt-auto p-6">
        <button onClick={() => navigateTo('C-07')} className="btn-primary">充值并开启服务</button>
      </div>
    </div>
  );

  const renderC06 = () => (
    <div className="h-full flex flex-col bg-[#FAFAF8]">
      <Header title="试打体验" subtitle="在正式开启前，先让家人熟悉助手的声音" step={5} showSkip={false} />
      <div className="p-6 flex-1 flex flex-col items-center text-center">
        <div className="w-full h-48 bg-white rounded-3xl mb-8 flex items-center justify-center relative overflow-hidden">
          {isTestCalling ? (
            <div className="flex flex-col items-center animate-fade">
              <div className="relative">
                <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white relative z-10">
                  <Phone size={32} />
                </div>
              </div>
              <div className="mt-4 font-bold text-green-500">正在呼叫 {formData.relation}...</div>
            </div>
          ) : testCallDone ? (
            <div className="flex flex-col items-center animate-fade">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-500">
                <Check size={32} />
              </div>
              <div className="mt-4 font-bold text-green-600">试打完成</div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Phone size={48} className="text-[#FFE346] mb-4" />
              <div className="text-gray-300 text-sm">美团外卖助手</div>
            </div>
          )}
        </div>

        <h2 className="text-xl font-bold mb-4">建议先打一个体验电话</h2>
        <div className="space-y-4 text-left w-full px-4">
          {[
            '让家人提前认识这个助手，不会陌生',
            '体验完整对话流程，不真正下单',
            '确认家人接听习惯，避免开通后打不通'
          ].map((text, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="mt-1 w-4 h-4 bg-green-100 rounded-full flex items-center justify-center text-green-500"><Check size={10} /></div>
              <p className="text-sm text-gray-600">{text}</p>
            </div>
          ))}
        </div>

        {testCallDone && (
          <div className="mt-8 w-full card bg-green-50/50 border border-green-100 flex items-center justify-between">
            <div className="text-sm font-medium text-green-700">试打完成 · {formData.relation}已接听</div>
            <div className="text-xs text-green-600">1分12秒</div>
          </div>
        )}
      </div>
      <div className="p-6 space-y-4">
        {!testCallDone ? (
          <>
            <button 
              onClick={() => {
                setIsTestCalling(true);
                setTimeout(() => {
                  setIsTestCalling(false);
                  setTestCallDone(true);
                }, 3000);
              }} 
              className="btn-primary"
              disabled={isTestCalling}
            >
              {isTestCalling ? '正在呼叫...' : '现在试打'}
            </button>
            <button onClick={() => navigateTo('C-05')} className="btn-ghost w-full">跳过，去充值</button>
          </>
        ) : (
          <button onClick={() => navigateTo('C-05')} className="btn-primary">去充值并开通</button>
        )}
      </div>
    </div>
  );

  const renderC07 = () => (
    <div className="h-full flex flex-col bg-[#FAFAF8]">
      <Header title="开通成功" step={7} showBack={false} showSkip={false} />
      <div className="p-6 flex-1 overflow-y-auto">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold">已为{formData.relation}开通家人助餐服务</h2>
          <p className="text-sm text-gray-500">将邀请卡发给{formData.relation}，让他知道怎么用</p>
        </div>

        <div className="bg-white rounded-[24px] shadow-2xl p-6 relative overflow-hidden border border-gray-100">
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#FFE346] rounded flex items-center justify-center text-[10px] font-bold">美团</div>
              <span className="text-[10px] text-gray-400 font-bold tracking-widest">家人助餐服务</span>
            </div>
            <div className="text-[10px] text-gray-300">NO. 88293041</div>
          </div>

          <h3 className="text-2xl font-bold mb-6">{formData.relation}专属助餐服务</h3>
          
          <div className="bg-gray-50 rounded-xl p-3 mb-8 inline-block">
            <span className="text-xs text-gray-500">由您的子女 <span className="text-[#1A1A1A] font-bold">张三</span> 为您开通</span>
          </div>

          <div className="space-y-4 mb-10">
            <div className="flex items-center gap-3 text-sm">
              <Phone size={16} className="text-gray-400" />
              <span>每天 {formData.lunchTime} 和 {formData.dinnerTime} 提醒</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Utensils size={16} className="text-gray-400" />
              <span>{MEAL_LEVELS.find(l => l.id === formData.mealLevel)?.name} · {MEAL_LEVELS.find(l => l.id === formData.mealLevel)?.price}/餐</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <ShieldCheck size={16} className="text-gray-400" />
              <span>{formData.taboos.join(' · ') || '暂无禁忌'}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Heart size={16} className="text-red-400" />
              <span className="font-bold">健康档案：{formData.healthConditions.join(' · ')}</span>
            </div>
          </div>

          <div className="flex justify-between items-end">
            <div className="text-[10px] text-gray-300">
              客服：400-820-8820<br />
              美团外卖官方服务
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-lg mb-1 flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-gray-200 border-dashed"></div>
              </div>
              <div className="text-[8px] text-gray-400">扫码查看今日推荐</div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 w-full h-1 border-b-2 border-dashed border-gray-100"></div>
        </div>

        <div className="mt-8 flex gap-3">
          <button className="flex-1 h-12 bg-white border border-gray-200 rounded-2xl flex items-center justify-center gap-2 text-sm font-medium">
            <Share2 size={16} /> 发给{formData.relation}
          </button>
          <button className="flex-1 h-12 bg-white border border-gray-200 rounded-2xl flex items-center justify-center gap-2 text-sm font-medium">
            <Download size={16} /> 保存图片
          </button>
        </div>
      </div>
      <div className="p-6">
        <button onClick={() => navigateTo('D-01')} className="btn-primary">设置成功</button>
      </div>
    </div>
  );

  const renderP01 = () => (
    <div className="h-full flex flex-col bg-[#FFFBEA] p-8 text-center">
      <div className="flex justify-center mb-12">
        <div className="w-12 h-12 bg-[#FFE346] rounded-xl flex items-center justify-center font-bold text-xl">美团</div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-64 h-64 bg-white/50 rounded-full mb-12 flex items-center justify-center">
          <div className="text-8xl">👵</div>
        </div>
        <h2 className="text-4xl font-bold mb-8">家人已为您安排好了</h2>
        <div className="space-y-6 text-xl text-gray-600 leading-relaxed">
          <p>每天到饭点，会有电话提醒您</p>
          <p>告诉电话里的助手想吃什么就行</p>
          <p>不会用手机？没关系，接电话就够了</p>
        </div>
      </div>
      <button onClick={() => navigateTo('P-02')} className="h-20 bg-[#FFE346] rounded-[32px] text-2xl font-bold shadow-xl active:scale-95 transition-transform">知道了</button>
      <div className="absolute top-2 right-2 text-[10px] text-gray-300 font-mono">{currentPage}</div>
    </div>
  );

  const renderP02 = () => (
    <div className="h-full flex flex-col bg-[#FAFAF8]">
      <ParentHeader title={`${formData.relation}，今天午饭吃什么？`} />
      <div className="flex-1 overflow-y-auto p-6 space-y-6 pb-32">
        {MOCK_DISHES.map((dish, i) => (
          <div 
            key={dish.id} 
            onClick={() => navigateTo('P-03')}
            className="card flex items-center gap-6 p-6 active:scale-98 transition-transform cursor-pointer"
          >
            <div className="w-16 h-16 bg-[#FFE346] rounded-full flex items-center justify-center text-4xl font-bold shrink-0">
              {i + 1}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-4xl">{dish.icon}</span>
                <h3 className="text-2xl font-bold">{dish.name}</h3>
              </div>
              <p className="text-lg text-gray-500 mb-1">{dish.desc}</p>
              <p className="text-base text-gray-400">{dish.shop}</p>
            </div>
            <ChevronRight size={32} className="text-gray-300" />
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 w-full p-6 bg-white border-t border-gray-100">
        <button className="w-full h-20 border-4 border-[#FFE346] rounded-[32px] flex items-center justify-center gap-4 text-2xl font-bold">
          <Phone size={32} className="text-[#FFE346]" /> 打电话点餐
        </button>
        <p className="text-center text-gray-400 mt-2 text-sm">不会选？打电话让助手帮您</p>
      </div>
    </div>
  );

  const renderP03 = () => (
    <div className="h-full bg-black/40 flex flex-col justify-end">
      <motion.div 
        initial={{ y: 500 }} animate={{ y: 0 }}
        className="bg-white rounded-t-[48px] p-10 pb-16 flex flex-col items-center text-center"
      >
        <div className="w-16 h-2 bg-gray-100 rounded-full mb-10"></div>
        <div className="text-9xl mb-6">🍜</div>
        <h2 className="text-4xl font-bold mb-8">番茄鸡蛋面</h2>
        <div className="space-y-4 mb-12 text-xl text-gray-500">
          <p className="flex items-center justify-center gap-2"><Settings size={20} /> 老街面馆</p>
          <p className="flex items-center justify-center gap-2"><Clock size={20} /> 约35分钟送达</p>
          <p className="text-[#52C41A] font-bold">💰 由家人餐费支付，您无需付款</p>
        </div>
        <div className="flex gap-4 w-full">
          <button onClick={() => navigateTo('P-02')} className="flex-1 h-20 border-4 border-gray-200 rounded-[32px] text-2xl font-bold">换一个</button>
          <button onClick={() => navigateTo('P-04')} className="flex-1 h-20 bg-[#FFE346] rounded-[32px] text-2xl font-bold shadow-lg">就要这个</button>
        </div>
      </motion.div>
      <div className="absolute top-2 right-2 text-[10px] text-white/50 font-mono">{currentPage}</div>
    </div>
  );

  const renderP04 = () => (
    <div className="h-full flex flex-col bg-[#FAFAF8] p-8 text-center">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center text-green-500 mb-12 animate-bounce">
          <Check size={64} strokeWidth={4} />
        </div>
        <h2 className="text-4xl font-bold mb-6">已为您下单啦</h2>
        <p className="text-2xl text-gray-500 mb-12">预计 13:05 送到您家门口</p>
        
        <div className="card w-full p-8 space-y-6 text-left">
          <div className="flex items-center gap-4">
            <span className="text-5xl">🍜</span>
            <div>
              <div className="text-2xl font-bold">番茄鸡蛋面</div>
              <div className="text-lg text-gray-400">老街面馆</div>
            </div>
          </div>
          <div className="h-[1px] bg-gray-100"></div>
          <p className="text-xl text-gray-600 leading-relaxed">骑手小哥会送到您手上，请留意敲门声</p>
          <p className="text-lg text-gray-400">有问题请拨：400-820-8820</p>
        </div>
      </div>
      <button onClick={() => navigateTo('P-02')} className="h-20 bg-[#FFE346] rounded-[32px] text-2xl font-bold shadow-xl">好的，知道了</button>
      <div className="absolute top-2 right-2 text-[10px] text-gray-300 font-mono">{currentPage}</div>
    </div>
  );

  const renderD01 = () => (
    <div className="h-full flex flex-col bg-[#FAFAF8]">
      <div className="px-6 py-8">
        <h1 className="text-2xl font-bold">家人助餐服务</h1>
        <p className="text-sm text-gray-400">{formData.relation}的助餐状态</p>
      </div>
      
      <div className="px-6 space-y-6 flex-1 overflow-y-auto pb-24">
        <div className="bg-[#FFFBEA] p-6 rounded-3xl border border-[#FFE346]/30 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold flex items-center gap-2">🛵 配送中</span>
            <span className="text-sm text-[#1A1A1A] font-medium">预计 13:05 到达</span>
          </div>
          <div className="text-sm text-gray-600">番茄鸡蛋面 · 老街面馆 · ¥22</div>
          <div className="flex items-center gap-1 pt-2">
            {[1,2,3,4].map(i => (
              <React.Fragment key={i}>
                <div className={`w-3 h-3 rounded-full ${i <= 3 ? 'bg-[#FFE346]' : 'bg-white'}`}></div>
                {i < 4 && <div className={`flex-1 h-1 ${i < 3 ? 'bg-[#FFE346]' : 'bg-white'}`}></div>}
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-gray-400 px-1">
            <span>已下单</span>
            <span>制作中</span>
            <span>配送中</span>
            <span>已送达</span>
          </div>
        </div>

        <div className="card p-6 flex justify-between items-center">
          <div className="space-y-1">
            <div className="text-sm text-gray-400">本周已订餐</div>
            <div className="text-2xl font-bold">5 <span className="text-sm font-normal">次</span></div>
          </div>
          <div className="w-[1px] h-10 bg-gray-100"></div>
          <div className="space-y-1">
            <div className="text-sm text-gray-400">均衡评分</div>
            <div className="text-2xl font-bold text-green-500">82 <span className="text-sm font-normal text-gray-400">分</span></div>
          </div>
          <button onClick={() => navigateTo('D-02')} className="text-blue-500 font-bold text-sm flex items-center gap-1">查看详情 <ChevronRight size={16} /></button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { label: '代点一单', icon: <Plus size={24} /> },
            { label: '调整餐标', icon: <Settings size={24} /> },
            { label: '暂停服务', icon: <X size={24} /> }
          ].map(item => (
            <div key={item.label} className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center text-[#1A1A1A]">
                {item.icon}
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border-t border-gray-100 px-6 py-4 flex justify-between items-center">
        <div className="flex flex-col items-center gap-1 text-[#FFE346]">
          <Home size={24} />
          <span className="text-[10px] font-bold">首页</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-300" onClick={() => navigateTo('D-02')}>
          <PieChart size={24} />
          <span className="text-[10px]">饮食分析</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-300" onClick={() => navigateTo('D-03')}>
          <History size={24} />
          <span className="text-[10px]">订单</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-300">
          <Settings size={24} />
          <span className="text-[10px]">设置</span>
        </div>
      </div>
      <div className="absolute top-2 right-2 text-[10px] text-gray-300 font-mono">{currentPage}</div>
    </div>
  );

  const renderD02 = () => (
    <div className="h-full flex flex-col bg-[#FAFAF8]">
      <StatusBar />
      <div className="px-6 py-6 flex items-center gap-4">
        <button onClick={goBack} className="p-2 -ml-2 bg-white rounded-full shadow-sm"><ChevronLeft size={20} /></button>
        <h1 className="text-xl font-bold">饮食分析</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-6 space-y-6 pb-10">
        {/* Score Card */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-50 flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-sm text-gray-400">本周健康分</div>
            <div className="text-4xl font-bold text-[#1A1A1A]">85 <span className="text-sm font-normal text-gray-400">分</span></div>
            <div className="text-[10px] text-green-500 font-bold">高于 92% 的同龄家人</div>
          </div>
          <div className="relative w-20 h-20">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="40" cy="40" r="34" stroke="#F5F5F5" strokeWidth="8" fill="none" />
              <circle cx="40" cy="40" r="34" stroke="#FFE346" strokeWidth="8" fill="none" strokeDasharray="213" strokeDashoffset="32" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">优</div>
          </div>
        </div>

        {/* Core Metrics */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: '总餐数', value: '14', unit: '次', color: 'text-blue-500' },
            { label: '平均热量', value: '650', unit: 'kcal', color: 'text-orange-500' },
            { label: '均衡度', value: '优', unit: '', color: 'text-green-500' }
          ].map(m => (
            <div key={m.label} className="bg-white p-3 rounded-2xl border border-gray-50 text-center">
              <div className="text-[10px] text-gray-400 mb-1">{m.label}</div>
              <div className={`text-lg font-bold ${m.color}`}>{m.value}<span className="text-[10px] font-normal ml-0.5">{m.unit}</span></div>
            </div>
          ))}
        </div>

        {/* Radar Chart Placeholder */}
        <div className="card p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold">营养构成</h3>
            <span className="text-[10px] text-gray-400">最近7天</span>
          </div>
          <div className="h-48 flex items-center justify-center relative">
            <svg width="180" height="180" viewBox="0 0 100 100">
              <polygon points="50,10 90,40 75,90 25,90 10,40" fill="none" stroke="#E5E5E5" strokeWidth="0.5" />
              <polygon points="50,25 75,45 65,75 35,75 25,45" fill="none" stroke="#E5E5E5" strokeWidth="0.5" />
              <polygon points="50,15 85,42 70,85 30,80 15,45" fill="rgba(255, 227, 70, 0.3)" stroke="#FFE346" strokeWidth="1.5" />
              <text x="50" y="8" fontSize="4" textAnchor="middle" fill="#999">蛋白质</text>
              <text x="95" y="42" fontSize="4" textAnchor="start" fill="#999">纤维</text>
              <text x="80" y="95" fontSize="4" textAnchor="middle" fill="#999">碳水</text>
              <text x="20" y="95" fontSize="4" textAnchor="middle" fill="#999">油脂</text>
              <text x="5" y="42" fontSize="4" textAnchor="end" fill="#999">维生素</text>
            </svg>
          </div>
        </div>

        {/* Trend Chart Placeholder */}
        <div className="card p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold">摄入趋势</h3>
            <div className="flex gap-2">
              <div className="flex items-center gap-1 text-[8px] text-gray-400"><div className="w-2 h-2 bg-[#FFE346] rounded-sm"></div>午餐</div>
              <div className="flex items-center gap-1 text-[8px] text-gray-400"><div className="w-2 h-2 bg-blue-400 rounded-sm"></div>晚餐</div>
            </div>
          </div>
          <div className="h-32 flex items-end justify-between px-2">
            {[40, 65, 45, 80, 55, 70, 60].map((h, i) => (
              <div key={i} className="flex flex-col items-center gap-1 w-6">
                <div className="w-full space-y-0.5">
                  <div className="bg-blue-400 rounded-t-sm" style={{ height: `${h*0.4}px` }}></div>
                  <div className="bg-[#FFE346]" style={{ height: `${h*0.6}px` }}></div>
                </div>
                <span className="text-[8px] text-gray-400">周{['一','二','三','四','五','六','日'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="card p-6 space-y-4">
          <h3 className="text-sm font-bold">健康建议</h3>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-orange-50 text-orange-600 text-[10px] rounded-full font-bold">🧂 盐分偏高</span>
            <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] rounded-full font-bold">🥬 纤维充足</span>
            <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] rounded-full font-bold">🥩 优质蛋白</span>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed bg-gray-50 p-4 rounded-2xl">
            “本周家人吃鱼较多，蛋白质充足；但连续三天晚餐油脂略高，建议下周调低餐标中的‘重口味’选项，增加清淡菜品比例。”
          </p>
        </div>
      </div>
      <div className="absolute top-2 right-2 text-[10px] text-gray-300 font-mono">{currentPage}</div>
    </div>
  );

  const renderD03 = () => (
    <div className="h-full flex flex-col bg-[#FAFAF8]">
      <StatusBar />
      <div className="px-6 py-6 flex items-center gap-4">
        <button onClick={goBack} className="p-2 -ml-2 bg-white rounded-full shadow-sm"><ChevronLeft size={20} /></button>
        <h1 className="text-xl font-bold">我的订单</h1>
      </div>

      <div className="px-6 mb-4 flex gap-6 border-b border-gray-100">
        {['全部', '进行中', '已完成'].map((tab, i) => (
          <button key={tab} className={`pb-3 text-sm font-bold relative ${i === 0 ? 'text-[#1A1A1A]' : 'text-gray-400'}`}>
            {tab}
            {i === 0 && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FFE346] rounded-full"></div>}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-10">
        {[
          { shop: '老街面馆', dish: '番茄鸡蛋面 + 烫青菜', time: '3月30日 11:45', price: '22.50', status: '配送中', icon: '🍜', statusColor: 'text-blue-500' },
          { shop: '渔家小厨', dish: '清蒸鱼套餐', time: '3月29日 17:30', price: '45.00', status: '已送达', icon: '🐟', statusColor: 'text-green-500' },
          { shop: '厨房大叔', dish: '红烧肉盖饭', time: '3月29日 12:10', price: '32.00', status: '已送达', icon: '🍱', statusColor: 'text-green-500' },
          { shop: '家常菜馆', dish: '西红柿炒蛋', time: '3月28日 12:15', price: '18.00', status: '已送达', icon: '🍳', statusColor: 'text-green-500' },
          { shop: '面点王', dish: '鲜肉包子 + 小米粥', time: '3月27日 08:20', price: '12.00', status: '已送达', icon: '🥟', statusColor: 'text-green-500' },
        ].map((order, i) => (
          <div key={i} className="card p-5 space-y-4">
            <div className="flex justify-between items-center">
              <div className="font-bold text-sm">{order.shop}</div>
              <span className={`text-xs font-bold ${order.statusColor}`}>{order.status}</span>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl">{order.icon}</div>
              <div className="flex-1 space-y-1">
                <div className="text-sm font-bold">{order.dish}</div>
                <div className="text-[10px] text-gray-400">{order.time}</div>
              </div>
              <div className="text-sm font-bold">¥{order.price}</div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button className="px-4 py-2 border border-gray-100 rounded-xl text-[10px] font-bold text-gray-500">查看详情</button>
              <button className="px-4 py-2 bg-[#FFFBEA] border border-[#FFE346] rounded-xl text-[10px] font-bold text-[#1A1A1A]">再来一单</button>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute top-2 right-2 text-[10px] text-gray-300 font-mono">{currentPage}</div>
    </div>
  );

  const renderScreen = () => {
    switch (currentPage) {
      case 'S-01': return renderS01();
      case 'S-02': return renderOnboarding(2, '每天到饭点，自动提醒家人点餐', '您提前设置好口味和餐标，平台每天定时外呼，家人只需接个电话，饭菜就能送到门口', (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="w-32 h-32 bg-[#FFE346] rounded-full opacity-20 absolute animate-pulse"></div>
          <Phone size={64} className="text-[#FFE346] relative z-10" />
        </div>
      ));
      case 'S-03': return renderOnboarding(3, '您来设置，家人来享用', '选好餐标、口味和健康状况，我们只推符合要求的菜。设置一次，长期有效，随时可改', (
        <div className="relative w-full h-full flex items-center justify-center">
          {[
            { text: '低盐', x: -60, y: -40, size: 'text-xs', color: 'bg-blue-50' },
            { text: '不吃辣', x: 70, y: -60, size: 'text-sm', color: 'bg-orange-50' },
            { text: '软糯', x: -80, y: 50, size: 'text-base', color: 'bg-green-50' },
            { text: '少油', x: 60, y: 40, size: 'text-xs', color: 'bg-purple-50' },
            { text: '高蛋白', x: 0, y: -10, size: 'text-lg', color: 'bg-[#FFFBEA]' },
            { text: '无糖', x: 10, y: 70, size: 'text-sm', color: 'bg-red-50' },
          ].map((tag, i) => (
            <motion.div
              key={tag.text}
              initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
              animate={{ scale: 1, opacity: 1, x: tag.x, y: tag.y }}
              transition={{ 
                delay: i * 0.15, 
                type: 'spring', 
                stiffness: 100, 
                damping: 10 
              }}
              className={`absolute ${tag.color} px-4 py-2 rounded-full shadow-sm font-bold text-[#1A1A1A] border border-white/50 ${tag.size}`}
            >
              {tag.text}
            </motion.div>
          ))}
        </div>
      ));
      case 'S-04': return renderOnboarding(4, '到饭点，我们主动打给家人', '接通后AI助手报出您的称呼，家人放心接听。打不通会重拨，还会通知您', (
        <div className="flex flex-col items-center">
          <div className="text-4xl mb-4">📞</div>
          <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100">
            <div className="text-xs text-gray-400 mb-1">美团外卖助手</div>
            <div className="font-bold">受您委托来电</div>
          </div>
        </div>
      ));
      case 'S-05': return renderOnboarding(5, '说个数字，饭就下单了', '平台根据家人饮食习惯推荐符合口味的套餐。家人可以直接对话点餐，全程无需学会使用APP。', (
        <div className="flex flex-col items-center w-full px-6 gap-4">
          <div className="flex gap-4 w-full">
            <div className="flex-1 bg-white rounded-2xl p-2 shadow-sm border border-gray-100 relative overflow-hidden">
              <div className="absolute top-1 left-1 w-6 h-6 bg-[#FFE346] rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm z-10">1</div>
              <img 
                src="https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?q=80&w=400&auto=format&fit=crop" 
                alt="番茄鸡蛋面" 
                className="w-full h-24 object-cover rounded-xl mb-2"
                referrerPolicy="no-referrer"
              />
              <div className="px-1">
                <div className="text-[10px] font-bold">番茄鸡蛋面</div>
                <div className="text-[8px] text-gray-400">营养均衡 · 清淡</div>
              </div>
            </div>
            <div className="flex-1 bg-white rounded-2xl p-2 shadow-sm border border-gray-100 relative overflow-hidden">
              <div className="absolute top-1 left-1 w-6 h-6 bg-blue-400 text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm z-10">2</div>
              <img 
                src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400&auto=format&fit=crop" 
                alt="红烧肉套餐" 
                className="w-full h-24 object-cover rounded-xl mb-2"
                referrerPolicy="no-referrer"
              />
              <div className="px-1">
                <div className="text-[10px] font-bold">红烧肉套餐</div>
                <div className="text-[8px] text-gray-400">软糯可口 · 能量</div>
              </div>
            </div>
          </div>
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="self-end bg-[#1A1A1A] text-white px-4 py-2 rounded-2xl rounded-tr-none text-xs font-bold shadow-lg"
          >
            “我要第一个”
          </motion.div>
        </div>
      ));
      case 'S-06': return renderOnboarding(6, '家人吃了什么，您一目了然', '实时推送订餐状态，查看本周饮食记录，随时调整餐标或暂停服务', (
        <div className="w-full px-6 space-y-4">
          <div className="bg-[#FFFBEA] p-4 rounded-2xl border border-[#FFE346] shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div className="text-xs font-bold">🛵 配送中</div>
              <div className="text-[10px] text-gray-500">预计 12:45 送到</div>
            </div>
            <div className="text-[10px] text-gray-600 mb-2">今日午餐：番茄鸡蛋面</div>
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div className="w-3/4 h-full bg-[#FFE346]"></div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm opacity-60">
            <div className="text-[10px] font-bold mb-2">历史订单</div>
            <div className="space-y-2">
              <div className="flex justify-between text-[8px]">
                <span>昨天 12:10</span>
                <span>红烧肉套餐</span>
                <span className="text-green-500">已送达</span>
              </div>
              <div className="flex justify-between text-[8px]">
                <span>前天 12:15</span>
                <span>清蒸鱼套餐</span>
                <span className="text-green-500">已送达</span>
              </div>
            </div>
          </div>
        </div>
      ));
      case 'C-01': return renderC01();
      case 'C-02': return renderC02();
      case 'C-03': return renderC03();
      case 'C-04': return renderC04();
      case 'C-05': return renderC05();
      case 'C-06': return renderC06();
      case 'C-07': return renderC07();
      case 'P-01': return renderP01();
      case 'P-02': return renderP02();
      case 'P-03': return renderP03();
      case 'P-04': return renderP04();
      case 'D-01': return renderD01();
      case 'D-02': return renderD02();
      case 'D-03': return renderD03();
      default: return renderS01();
    }
  };

  return (
    <div className="phone-container">
      <div className="safe-area-top"></div>
      <div className="screen-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="safe-area-bottom">
        <div className="home-indicator"></div>
      </div>
    </div>
  );
}
